## 🚀 Guia de Atualização do SaaS - Busca por Nicho

Você agora tem uma **nova funcionalidade** de busca avançada por nicho + região!

---

## 📋 O que foi adicionado?

### ✨ Nova Aba: "🌍 Busca por Nicho"

Uma terceira aba no seu app que permite buscar todas as empresas de um determinado tipo em uma região específica.

**Exemplo:** 
- Digite "pizzaria" + "guarulhos"
- O sistema busca automaticamente todas as pizzarias em Guarulhos
- Retorna: nome, telefone, email, endereço e avaliação

---

## 📱 Como Usar (Para Você)

### 1. **Localmente** (antes de fazer deploy)
```bash
npm start
```
Abra: `http://localhost:3000`

### 2. **Na Vercel** (em produção)
Abra: `https://braspress-extractor.vercel.app`

### 3. **Clicar na aba "🌍 Busca por Nicho"**

### 4. **Preencher os campos:**
- **Campo 1:** O tipo de negócio (ex: pizzaria, consultório, farmácia, oficina)
- **Campo 2:** A região/cidade (ex: guarulhos, são paulo, belo horizonte)

### 5. **Clicar em "🌍 Buscar Empresas"**

### 6. **Resultado:** 
- Tabela com todas as empresas encontradas
- Telefone, Email, Endereço
- Avaliação (⭐ se disponível)
- **Botão para download em CSV**

---

## 🔄 Como Atualizar a Vercel

Você **já fez o push** para o GitHub, então a Vercel está se atualizando automaticamente!

### Passo a Passo:

#### 1️⃣ **Aguarde 2-3 minutos** (Vercel faz deploy automático)

#### 2️⃣ **Verifique o Status (IMPORTANTE)**
1. Acesse: https://vercel.com
2. Clique no projeto: **braspress-extractor**
3. Clique em: **Deployments**
4. Procure pelo deploy com mensagem: **"Add advanced search by niche and region feature"**
5. Espere o status ficar **🟢 VERDE** (significa: sucesso)

#### 3️⃣ **Teste a Nova Funcionalidade**
1. Abra: https://braspress-extractor.vercel.app
2. Limpe o cache: **Ctrl + Shift + R** (Windows/Linux) ou **Cmd + Shift + R** (Mac)
3. Clique na aba: **🌍 Busca por Nicho**
4. Teste com um exemplo:
   - Campo 1: `pizzaria`
   - Campo 2: `guarulhos`
   - Clique: **Buscar Empresas**

---

## 📊 Recursos Completos

### **Aba 1: 🔍 Busca Simples**
- Digita um CNPJ
- Encontra dados da empresa (se registrada)

### **Aba 2: 📦 Busca em Lote**
- Carrega arquivo CSV/Excel com múltiplos CNPJs
- Processa todos de uma vez
- Baixa resultado em CSV

### **Aba 3: 🌍 Busca por Nicho (NOVO!)**
- Busca por tipo de negócio + região
- Encontra todas as empresas nessa categoria
- Extrai: telefone, email, endereço
- Baixa em CSV

---

## ⚡ Próximas Melhorias (Futuros)

Se quiser adicionar depois:
- ✓ Filtrar por avaliação mínima (⭐ 4+)
- ✓ Filtrar por "aberto agora"
- ✓ Integrar com mais APIs de mapas
- ✓ Histórico de buscas

---

## 🛠️ Arquivos que Foram Modificados

```
📁 public/index.html          (Interface - nova aba)
📁 server.js                  (Backend - novo endpoint)
📁 scraper/searchNiche.js     (NOVO - lógica de busca)
📁 package.json               (Nova dependência: puppeteer)
```

---

## ❓ Se der erro...

### Erro: "Nenhuma empresa encontrada"
- Tente um nicho mais popular (ex: "pizzaria" em vez de "restaurante de sushi")
- Tente uma cidade maior (ex: "são paulo" em vez de uma cidade pequena)

### Erro: "Timeout"
- A busca no Google Maps demorou muito
- Tente novamente em alguns minutos

### Erro: "Endpoint não encontrado"
- Verifique se o deploy na Vercel completou (status 🟢)
- Faça um hard refresh: **Ctrl + Shift + R**

---

## 📞 Contato para Dúvidas

Se tiver problemas, me avise:
- Descreva o erro exato que viu
- Me diga qual aba você estava usando
- Qual era o nicho e região que procurava

---

## 🎉 Parabéns!

Você agora tem um SaaS com **3 formas diferentes de buscar dados de empresas**!

**Status:** ✅ Tudo atualizado e no ar!

**Próximo passo:** Chamar seus clientes para testar! 🚀
