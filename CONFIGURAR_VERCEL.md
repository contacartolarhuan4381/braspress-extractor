# ⚙️ Configurar Chave de API na Vercel

Você fez o push do código com integração do Google Places API. Agora precisa configurar a chave de forma **SEGURA** na Vercel.

---

## 🔐 Passo a Passo (5 minutos)

### **1️⃣ Acessar a Vercel**

1. Acesse: https://vercel.com
2. Clique no projeto: **braspress-extractor**
3. Clique em: **Settings** (engrenagem no topo)

### **2️⃣ Configurar Variável de Ambiente**

1. No menu lateral, clique em: **Environment Variables**
2. Clique em: **Add New**
3. Preencha:
   - **Name:** `GOOGLE_PLACES_API_KEY`
   - **Value:** `AIzaSyAJdBkcsrCydkUQ2DrUeH3aXuCn2gk7kxU`
   - **Select Environments:** Marque todas (Production, Preview, Development)

4. Clique em: **Save**

### **3️⃣ Fazer Deploy**

1. Vá em: **Deployments**
2. O deployment mais recente vai aparecer
3. Clique no `...` (três pontos) e selecione: **Redeploy**
4. Confirme: **Yes, redeploy**
5. Aguarde terminar (status 🟢 verde)

---

## ✅ Teste a Nova Funcionalidade

Depois que o deploy terminar (3-5 minutos):

### **Local (para testar agora):**
```bash
npm start
```
Abra: http://localhost:3000

### **Online (depois do deploy):**
Abra: https://braspress-extractor.vercel.app

---

## 🧪 Testes Recomendados

Clique em **🌍 Busca por Nicho** e teste com:

| Nicho | Região | Resultado Esperado |
|---|---|---|
| pizzaria | guarulhos | 20+ pizzarias reais |
| consultório | são paulo | 20+ consultórios reais |
| farmácia | belo horizonte | 20+ farmácias reais |
| café | curitiba | Cafés reais |
| salão | rio de janeiro | Salões reais |

---

## 🎉 Resultados

Agora vai aparecer:
- ✅ **Nome real** das empresas
- ✅ **Telefone** verificado
- ✅ **Email** (quando disponível)
- ✅ **Endereço** completo
- ✅ **Avaliação** (⭐ de verdade)

---

## ❓ Dúvidas

**P: A chave está segura?**
R: Sim! Você configurou como **variável de ambiente na Vercel** (nunca aparece no GitHub)

**P: Quantos resultados consigo?**
R: Até 20 empresas por busca (você pode aumentar editando o código depois)

**P: Vai custar algo?**
R: Não! O Google oferece 150 buscas GRÁTIS por dia. Mais que suficiente para começo.

---

**Status:** ✅ Pronto para testar!

Depois me avisa se funcionou! 🚀
