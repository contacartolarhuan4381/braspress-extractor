const express = require('express');
const path = require('path');
const cors = require('cors');
const cnpjScraper = require('./scraper/cnpjScraper');
const { searchGoogleMaps } = require('./scraper/searchNiche');
const multer = require('multer');
const XLSX = require('xlsx');
const fs = require('fs');

// Carregar variáveis de ambiente
require('dotenv').config({ path: '.env.local' });

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('public'));

// Middleware para validar CNPJ
const validateCNPJ = (req, res, next) => {
    const { cnpj } = req.body;
    if (!cnpj) {
        return res.status(400).json({ ok: false, error: 'CNPJ é obrigatório' });
    }
    
    const clean = cnpj.replace(/\D/g, '');
    if (clean.length !== 14) {
        return res.status(400).json({ ok: false, error: 'CNPJ inválido' });
    }
    
    req.cnpj = clean;
    next();
};

// Endpoint: Buscar CNPJ
app.post('/api/search', validateCNPJ, async (req, res) => {
    try {
        console.log(`Buscando CNPJ: ${req.cnpj}`);
        
        const data = await cnpjScraper({ cnpj: req.cnpj });
        
        console.log(`Resultado:`, data);
        
        if (!data) {
            return res.json({ ok: false, error: 'CNPJ não encontrado na base de dados' });
        }

        res.json({ ok: true, data });
    } catch (error) {
        console.error('Erro ao buscar CNPJ:', error.message);
        console.error('Stack:', error.stack);
        res.status(500).json({ ok: false, error: error.message || 'Erro ao buscar dados' });
    }
});

// Endpoint: Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Endpoint: Teste de API externa
app.get('/api/test', async (req, res) => {
    try {
        const https = require('https');
        const url = 'https://www.receitaws.com.br/v1/cnpj/11222333000181';
        
        https.get(url, (response) => {
            let data = '';
            response.on('data', chunk => data += chunk);
            response.on('end', () => {
                res.json({ 
                    status: 'ok', 
                    api: 'ReceitaWS',
                    responseCode: response.statusCode,
                    data: JSON.parse(data)
                });
            });
        }).on('error', (error) => {
            res.json({ status: 'error', error: error.message });
        });
    } catch (error) {
        res.json({ status: 'error', error: error.message });
    }
});

// Endpoint: Processar lote de CNPJs
app.post('/api/batch', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ ok: false, error: 'Arquivo não enviado' });
        }

        let cnpjs = [];

        // Processar CSV
        if (req.file.mimetype.includes('csv') || req.file.originalname.endsWith('.csv')) {
            const csv = req.file.buffer.toString('utf-8');
            const lines = csv.split('\n');
            
            // Encontrar coluna CNPJ
            const header = lines[0].toLowerCase();
            const cnpjIndex = header.includes('cnpj') ? header.split(',').map(h => h.trim()).indexOf(header.includes('"cnpj"') ? '"cnpj"' : 'cnpj') : 0;
            
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                if (!line) continue;
                
                const parts = line.split(',');
                const cnpj = parts[cnpjIndex] ? parts[cnpjIndex].replace(/\D/g, '') : '';
                
                if (cnpj.length === 14) {
                    cnpjs.push(cnpj);
                }
            }
        } 
        // Processar Excel
        else {
            const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const data = XLSX.utils.sheet_to_json(worksheet);
            
            data.forEach(row => {
                const cnpj = Object.values(row).find(val => {
                    const clean = String(val).replace(/\D/g, '');
                    return clean.length === 14;
                });
                
                if (cnpj) {
                    const clean = String(cnpj).replace(/\D/g, '');
                    if (clean.length === 14 && !cnpjs.includes(clean)) {
                        cnpjs.push(clean);
                    }
                }
            });
        }

        if (cnpjs.length === 0) {
            return res.json({ ok: false, error: 'Nenhum CNPJ válido encontrado no arquivo' });
        }

        if (cnpjs.length > 100) {
            return res.json({ ok: false, error: 'Máximo de 100 CNPJs por arquivo' });
        }

        // Processar cada CNPJ
        const results = [];
        for (const cnpj of cnpjs) {
            try {
                const data = await cnpjScraper({ cnpj });
                results.push({
                    cnpj: cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5'),
                    found: !!data,
                    nome: data?.nome || '',
                    telefone: data?.telefone || '',
                    email: data?.email || '',
                    endereco: data?.endereco || ''
                });
            } catch (error) {
                results.push({
                    cnpj: cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5'),
                    found: false,
                    nome: '',
                    telefone: '',
                    email: '',
                    endereco: ''
                });
            }
            // Delay para não sobrecarregar as APIs
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        res.json({ ok: true, data: results });

    } catch (error) {
        console.error('Erro ao processar lote:', error);
        res.status(500).json({ ok: false, error: error.message || 'Erro ao processar arquivo' });
    }
});

// Endpoint: Buscar por Nicho + Região
app.post('/api/search-niche', async (req, res) => {
    try {
        const { niche, region } = req.body;

        if (!niche || !region) {
            return res.json({ ok: false, error: 'Nicho e região são obrigatórios' });
        }

        const apiKey = process.env.GOOGLE_PLACES_API_KEY;
        if (!apiKey) {
            return res.json({ ok: false, error: 'Chave de API não configurada. Contacte o administrador.' });
        }

        console.log(`Buscando ${niche} em ${region}`);

        const results = await searchGoogleMaps(niche, region, apiKey);

        if (results.length === 0) {
            return res.json({ ok: false, error: 'Nenhuma empresa encontrada para esta busca' });
        }

        res.json({ ok: true, data: results });

    } catch (error) {
        console.error('Erro ao buscar nicho:', error.message);
        res.status(500).json({ ok: false, error: error.message || 'Erro ao buscar empresas' });
    }
});

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Tratamento de 404
app.use((req, res) => {
    res.status(404).json({ ok: false, error: 'Endpoint não encontrado' });
});

// Tratamento de erros global
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Erro interno do servidor' });
});

console.log('🔧 Iniciando aplicação...');
console.log('   Express versão:', require('express/package.json').version);

const PORT = process.env.PORT || 3000;
console.log(`📡 Tentando ouvir na porta ${PORT}...`);
console.log('   [DEBUG] Antes de app.listen()');

try {
    const server = app.listen(PORT);
    
    console.log('[DEBUG] Depois de app.listen()');
    console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
    console.log(`   PID: ${process.pid}`);
    console.log(`   Timestamp: ${new Date().toISOString()}`);
    
    server.once('error', (err) => {
        console.error('❌ ERRO AO ESCUTAR NA PORTA:', err.message);
        console.error('   Código:', err.code);
        if (err.code === 'EADDRINUSE') {
            console.error(`❌ Porta ${PORT} já está em uso!`);
        }
        process.exit(1);
    });
    
    server.once('listening', () => {
        console.log('📡 Servidor respondendo a requisições');
    });
} catch (err) {
    console.error('❌ ERRO CRÍTICO:', err.message);
    console.error('Stack:', err.stack);
    process.exit(1);
}

// Previne crash não tratado
process.on('uncaughtException', (err) => {
    console.error('❌ Exceção não tratada:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Promise rejeitada:', reason);
    process.exit(1);
});

module.exports = app;
