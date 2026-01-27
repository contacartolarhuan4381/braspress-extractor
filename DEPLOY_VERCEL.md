# 🚀 SaaS Deploy no Vercel

Seu app **Braspress Extractor** foi convertido para uma versão web moderna e pronta para deploy na **Vercel** (melhor que Netlify para Node.js backend).

## ✅ O que foi criado:

- ✅ **Frontend web moderno** (`public/index.html`) - UI responsiva com gradiente roxo
- ✅ **Backend Express.js** (`server.js`) - API em Node.js
- ✅ **Configuração Vercel** (`vercel.json`) - Deploy automático
- ✅ **Package.json atualizado** - Dependências corretas para web
- ✅ **API REST** (`/api/search`) - Para buscar CNPJs

## 📋 Pré-requisitos:

1. **Conta Vercel** (grátis): https://vercel.com
2. **Conta GitHub** (grátis): https://github.com
3. **Git instalado** no seu computador

## 🔧 Passos para Deploy:

### 1️⃣ Preparar repositório GitHub

```bash
# Entrar na pasta do projeto
cd c:\Users\Micro\Desktop\lead-captor

# Inicializar Git
git init
git add .
git commit -m "Initial commit: Braspress SaaS"

# Criar repositório no GitHub
# Ir em https://github.com/new
# Nome: braspress-extractor
# Copiar as linhas que aparecem:

git branch -M main
git remote add origin https://github.com/SEU_USUARIO/braspress-extractor.git
git push -u origin main
```

### 2️⃣ Deploy na Vercel (mais fácil que Netlify!)

**Opção A - Via Dashboard Vercel (Recomendado):**

1. Ir em: https://vercel.com/new
2. Clicar em "Import Git Repository"
3. Selecionar seu repositório `braspress-extractor`
4. Clicar "Deploy"
5. Pronto! Seu app estará em: `https://braspress-extractor.vercel.app`

**Opção B - Via CLI (Linha de comando):**

```bash
# Instalar Vercel CLI
npm install -g vercel

# Fazer deploy
vercel

# Seguir as instruções na tela
```

### 3️⃣ Testando o Deploy

Após deploy, sua URL será algo como:
```
https://braspress-extractor.vercel.app
```

Teste em seu navegador:
- Digite um CNPJ: `11222333000181`
- Clique "Buscar"
- Veja os dados aparecerem!

## 🌐 Seu app estará acessível:

- Para você
- Para seus clientes
- Em qualquer dispositivo (telefone, tablet, PC)
- Sem instalação

## 💰 Monetização (Opcional):

Com Vercel você pode:
1. Adicionar autenticação (Google/GitHub)
2. Implementar planos pagos
3. Limitar requisições por usuário
4. Usar Stripe para pagamentos

## 📊 Estatísticas no Vercel:

Após deploy, você verá:
- Número de requisições
- Tempo de resposta
- Uptime
- Erros

## 🔐 Variáveis de Ambiente (opcional):

Se precisar adicionar variáveis (chaves de API, tokens):

1. Ir em Vercel > Settings > Environment Variables
2. Adicionar suas variáveis
3. Clicar Deploy novamente

## ❓ FAQs:

**P: Vercel é melhor que Netlify?**
R: Sim para este caso. Netlify é para sites estáticos. Vercel é para backend Node.js.

**P: Quanto custa?**
R: Grátis até ~1000 requisições/dia. Depois é $0.50 por 100k requisições.

**P: Preciso manter o .exe?**
R: Não! O web é melhor - seus clientes acessam pelo navegador, sem instalação.

**P: Como compartilhar com clientes?**
R: Envie o link: `https://braspress-extractor.vercel.app` via WhatsApp/Email

**P: Funciona offline?**
R: Não, precisa internet (como qualquer SaaS).

## 📞 Próximos passos sugeridos:

1. ✅ Deploy na Vercel (agora)
2. ⏭️ Adicionar autenticação com Google
3. ⏭️ Implementar sistema de planos pagos
4. ⏭️ Adicionar dashboard com histórico
5. ⏭️ Integrar com Stripe para pagamentos

---

**Seu app está pronto para ir ao mundo! 🌍**
