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
        const data = await cnpjScraper.searchCNPJ(req.cnpj);
        
        if (!data) {
            return res.json({ ok: false, error: 'CNPJ não encontrado na base de dados' });
        }

        res.json({ ok: true, data });
    } catch (error) {
        console.error('Erro ao buscar CNPJ:', error);
        res.status(500).json({ ok: false, error: 'Erro ao buscar dados. Tente novamente.' });
    }
});

// Endpoint: Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
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
