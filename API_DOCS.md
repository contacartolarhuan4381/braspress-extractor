# 🔌 Documentação da API - Braspress

## Base URL

```
Desenvolvimento: http://localhost:3000
Produção: https://braspress-extractor.vercel.app
```

## Endpoints

### 1. Buscar CNPJ

**Endpoint:**
```
POST /api/search
```

**Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Request Body:**
```json
{
  "cnpj": "11.222.333/0001-81"
}
```

**Response (Sucesso - 200):**
```json
{
  "ok": true,
  "data": {
    "cnpj": "11222333000181",
    "nome": "EMPRESA XYZ LTDA",
    "telefone": "(11) 999999999",
    "email": "contato@empresa.com.br",
    "endereco": "Rua ABC, 123 - São Paulo/SP"
  }
}
```

**Response (Erro - 200):**
```json
{
  "ok": false,
  "error": "CNPJ não encontrado na base de dados"
}
```

**Response (Validação - 400):**
```json
{
  "ok": false,
  "error": "CNPJ deve ter 14 dígitos"
}
```

---

## Exemplos de Uso

### JavaScript/Fetch

```javascript
async function buscarCNPJ(cnpj) {
  try {
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cnpj })
    });
    
    const result = await response.json();
    
    if (result.ok) {
      console.log('Nome:', result.data.nome);
      console.log('Telefone:', result.data.telefone);
      console.log('Email:', result.data.email);
      console.log('Endereço:', result.data.endereco);
    } else {
      console.error('Erro:', result.error);
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
}

buscarCNPJ('11.222.333/0001-81');
```

### cURL

```bash
curl -X POST http://localhost:3000/api/search \
  -H "Content-Type: application/json" \
  -d '{"cnpj": "11.222.333/0001-81"}'
```

### Python

```python
import requests

url = "http://localhost:3000/api/search"
data = {"cnpj": "11.222.333/0001-81"}

response = requests.post(url, json=data)
result = response.json()

if result.get('ok'):
    print(f"Nome: {result['data']['nome']}")
    print(f"Telefone: {result['data']['telefone']}")
    print(f"Email: {result['data']['email']}")
    print(f"Endereço: {result['data']['endereco']}")
else:
    print(f"Erro: {result['error']}")
```

### Node.js (axios)

```javascript
const axios = require('axios');

async function buscarCNPJ(cnpj) {
  try {
    const response = await axios.post('http://localhost:3000/api/search', {
      cnpj: cnpj
    });
    
    console.log(response.data);
  } catch (error) {
    console.error('Erro:', error.response.data);
  }
}

buscarCNPJ('11.222.333/0001-81');
```

---

## 2. Health Check

**Endpoint:**
```
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-27T17:30:45.123Z"
}
```

---

## Tratamento de Erros

### Possíveis Erros:

| Erro | Causa | Solução |
|------|-------|---------|
| `CNPJ é obrigatório` | Não enviou CNPJ | Validar input antes de enviar |
| `CNPJ inválido` | CNPJ com menos de 14 dígitos | Remover formatação e validar |
| `CNPJ não encontrado` | Não existe na base | Sugerir outro CNPJ |
| `Muitas requisições` | Rate limiting da API | Aguardar alguns segundos |
| `Erro ao processar resposta` | Problema na API | Tentar novamente |

---

## Limites (Rate Limiting)

**Vercel Free Tier:**
- Máximo: ~1000 requisições/dia
- Limit: 50 requisições/minuto

**Se precisa mais:**
- Upgrade para Vercel Pro: $20/mês
- Ou usar cache/CDN próprio

---

## CORS

A API permite requisições de qualquer origem:

```javascript
// Funciona de qualquer site
fetch('https://braspress-extractor.vercel.app/api/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ cnpj: '11.222.333/0001-81' })
});
```

---

## Autenticação (Futura)

Próximamente será adicionado sistema de autenticação:

```javascript
headers: {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer TOKEN_DO_USUARIO'
}
```

---

## Webhooks (Futura)

Será possível configurar webhooks para ser notificado quando uma busca é feita:

```javascript
POST /api/webhooks/register
{
  "url": "https://seu-site.com/webhook",
  "events": ["cnpj.searched"]
}
```

---

## Testando a API

### Online (Após deploy)

```bash
curl -X POST https://braspress-extractor.vercel.app/api/search \
  -H "Content-Type: application/json" \
  -d '{"cnpj": "11.222.333/0001-81"}'
```

### Localmente

```bash
npm install
npm start

# Em outro terminal:
curl -X POST http://localhost:3000/api/search \
  -H "Content-Type: application/json" \
  -d '{"cnpj": "11.222.333/0001-81"}'
```

---

## Monitoramento

No Vercel, você pode monitorar:
- **Requests/dia**
- **Tempo de resposta**
- **Erros**
- **Bandwith utilizado**

Acesse: `https://vercel.com/seu-usuario/braspress-extractor/analytics`

---

## Suporte

Dúvidas sobre a API?
- [ ] Verificar documentação acima
- [ ] Testar com cURL primeiro
- [ ] Verificar logs no Vercel
- [ ] Abrir issue no GitHub

