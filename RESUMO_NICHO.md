# 🎯 RESUMO VISUAL - Busca por Nicho

## Antes (2 abas)
```
┌─────────────────────────────────────┐
│  🔍 Busca Simples  │  📦 Busca em Lote  │
└─────────────────────────────────────┘
│                                       │
│  Campo: CNPJ (ex: 11.222.333/...)  │
│  Resultado: 1 empresa                │
│                                       │
└───────────────────────────────────────┘
```

## Agora (3 abas) ✨ NOVO!
```
┌──────────────────────────────────────────────────────┐
│ 🔍 Busca  │ 📦 Lote  │ 🌍 Busca por Nicho (NOVO!)  │
└──────────────────────────────────────────────────────┘
│                                                      │
│  Campo 1: Tipo de negócio (ex: pizzaria)           │
│  Campo 2: Região (ex: guarulhos)                    │
│                                                      │
│  Resultado: Múltiplas empresas encontradas!        │
│  ┌──────────────┬────────┬────────┬────────────┐   │
│  │ Empresa      │ Tel    │ Email  │ Endereço   │   │
│  ├──────────────┼────────┼────────┼────────────┤   │
│  │ Pizzaria XYZ │ (11)... │ ... │ Rua... SP  │   │
│  │ Pizzaria ABC │ (11)... │ ... │ Av...  SP  │   │
│  │ Pizzaria 123 │ (11)... │ ... │ Trav... SP │   │
│  └──────────────┴────────┴────────┴────────────┘   │
│                                    ⬇️ Download CSV  │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## 📊 Comparativo de Funcionalidades

| Funcionalidade | Busca Simples | Busca Lote | Busca Nicho ⭐ |
|---|---|---|---|
| **Quantidade** | 1 CNPJ | Até 100 CNPJs | Ilimitado |
| **Entrada** | CNPJ | Arquivo CSV/Excel | Texto (nicho + região) |
| **Saída** | 1 resultado | Múltiplos CNPJs processados | Múltiplas empresas |
| **Tempo** | Rápido (5s) | Médio (1-2 min) | Médio a longo (2-5 min) |
| **Dados** | Nome, Tel, Email, Endereço | Idem | Idem + Avaliação |
| **Export** | Copiar individual | CSV automático | CSV automático |
| **Melhor Para** | Busca rápida | Processar lista | Explorar mercado |

---

## 🔧 Alterações Técnicas

### Arquivos Novos
✅ `scraper/searchNiche.js` - Lógica de web scraping do Google Maps

### Arquivos Modificados
✅ `public/index.html` - Adicionada aba "🌍 Busca por Nicho"
✅ `server.js` - Adicionado endpoint `/api/search-niche`
✅ `package.json` - Nova dependência: `puppeteer`

### Endpoints API
- POST `/api/search-niche`
  - Entrada: `{ niche: string, region: string }`
  - Saída: `{ ok: boolean, data: Array[empresa] }`

---

## 🚀 Como Ficou o Deploy

```
GitHub Push ──→ Vercel Auto-Deploy ──→ LIVE em 3 minutos
     ✅              ✅                    ✅
```

**Status Atual:** 🟢 ONLINE
**URL:** https://braspress-extractor.vercel.app

---

## 💡 Dicas de Uso

### ✅ Exemplos que funcionam bem
- ✓ "pizzaria" em "guarulhos"
- ✓ "consultório" em "são paulo"
- ✓ "farmácia" em "belo horizonte"
- ✓ "oficina" em "curitiba"
- ✓ "salão" em "rio de janeiro"

### ⚠️ Evitar
- ✗ Cidades muito pequenas (poucos resultados)
- ✗ Nicho muito específico (ex: "pizza vegana gourmet")
- ✗ Regiões muito genéricas (tenta ser mais específico)

### ⏱️ Tempo de Resposta
- **Buscas rápidas (5-30 seg):** Cidades pequenas, nichos populares
- **Buscas normais (1-2 min):** Cidades médias
- **Buscas lentas (2-5 min):** Cidades grandes, muitos resultados

---

## 🎯 Próximas Funcionalidades (Ideias)

- [ ] Filtrar por rating mínimo
- [ ] Filtrar por "aberto agora"
- [ ] Buscar por categoria (CNAE)
- [ ] Integrar com redes sociais
- [ ] Validar emails em tempo real
- [ ] Análise de concorrência

---

**Versão:** 2.1.0
**Data:** 27 de Janeiro de 2026
**Status:** ✅ PRONTO PARA PRODUÇÃO
