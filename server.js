const express = require('express');
const path = require('path');
const cors = require('cors');
const cnpjScraper = require('./scraper/cnpjScraper');

const app = express();

app.use(cors());
app.use(express.json());
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;
