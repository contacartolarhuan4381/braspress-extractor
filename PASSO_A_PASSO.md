# 📱 Passo a Passo Detalhado - Deploy para Leigos

**Não tem experiência técnica? Sem problema! Siga exatamente estes passos.**

---

## ⏱️ Tempo Total: 15 minutos

```
Passo 1-2: Contas (5 min)
Passo 3-5: Deploy (10 min)
```

---

## 🟢 PASSO 1: Criar Conta no GitHub (3 minutos)

### O que é GitHub?
É um site onde você "salva" seu código online para fazer deploy.

### Como fazer:

1. **Abra seu navegador** (Chrome, Firefox, Edge, etc)

2. **Vá para:** `https://github.com/signup`
   - Copie este link exato e cole na barra de endereço

3. **Você verá uma tela com:**
   - `Enter your email` → Digite seu email (ex: seu@gmail.com)
   - Clique em `Continue`

4. **Digite uma senha** (qualquer uma que você lembre)
   - Clique em `Continue`

5. **Digite um username** (seu nome de usuário, ex: "seunomedeusuario")
   - Clique em `Continue`

6. **Responda "Would you like to receive...?"**
   - Clique `Continue` (não importa a resposta)

7. **Resolve o Captcha**
   - Clique em `Create account`

8. **Verifica Email**
   - GitHub envia código para seu email
   - Abra seu email
   - Copie o código
   - Paste de volta no GitHub
   - Clique em `Verify`

✅ **Pronto! Você tem conta GitHub**

---

## 🟢 PASSO 2: Criar Repositório GitHub (2 minutos)

### O que é Repositório?
É uma "pasta" no GitHub onde seu código fica salvo.

### Como fazer:

1. **Você está logado no GitHub?**
   - Canto superior direito tem um ícone de perfil
   - Se não estiver logado, faça login

2. **Clique no `+` verde** (canto superior direito)
   - Selecione `New repository`

3. **Preencha assim:**
   ```
   Repository name: braspress-extractor
   Description: Extrator de dados de CNPJ
   Visibility: Public (deixa em cima, já está)
   ```

4. **Clique em `Create repository`**

5. **Cópia a URL que aparece:**
   - Procure por: `https://github.com/SEU_USUARIO/braspress-extractor.git`
   - **COPIE esta URL** (você vai usar no Passo 4)

✅ **Pronto! Repositório criado**

---

## 🟢 PASSO 3: Fazer Push do Código (5 minutos)

### O que é Push?
É enviar seu código do seu PC para o GitHub online.

### Como fazer:

1. **Abra o Terminal (Prompt de Comando)**
   - No Windows: Pressione `Windows + R`
   - Digite: `powershell`
   - Pressione `Enter`

2. **Você verá uma tela preta** - é o Terminal

3. **Cole este comando:**
   ```
   cd c:\Users\Micro\Desktop\lead-captor
   ```
   - Pressione `Enter`

4. **Configure Git (primeira vez só):**
   ```
   git config user.email "seu@email.com"
   ```
   - Pressione `Enter`

5. **Configure nome:**
   ```
   git config user.name "Seu Nome"
   ```
   - Pressione `Enter`

6. **Prepare os arquivos:**
   ```
   git add .
   ```
   - Pressione `Enter`

7. **Salve a versão:**
   ```
   git commit -m "Deploy Braspress SaaS"
   ```
   - Pressione `Enter`

8. **Renomeie a branch (se pergunta):**
   ```
   git branch -M main
   ```
   - Pressione `Enter`

9. **Conecte ao GitHub:**
   ```
   git remote add origin https://github.com/SEU_USUARIO/braspress-extractor.git
   ```
   - **Substitua `SEU_USUARIO` pelo seu username do GitHub**
   - Exemplo: `https://github.com/joaosilva/braspress-extractor.git`
   - Pressione `Enter`

10. **Envie para GitHub:**
    ```
    git push -u origin main
    ```
    - Pressione `Enter`
    - **Se pedir senha, use seu email e senha do GitHub**

✅ **Pronto! Código está no GitHub**

---

## 🟢 PASSO 4: Criar Conta Vercel (3 minutos)

### O que é Vercel?
É a plataforma que vai "rodar" seu app online. Tipo um servidor automático.

### Como fazer:

1. **Abra seu navegador**

2. **Vá para:** `https://vercel.com/signup`

3. **Clique em:** `Continue with GitHub`

4. **GitHub pergunta para autorizar Vercel**
   - Clique em `Authorize vercel`

5. **Preencha:**
   ```
   Email: seu@email.com
   Username: qualquer nome
   ```

6. **Clique em `Create Account`**

✅ **Pronto! Você tem conta Vercel**

---

## 🔴 PASSO 5: Deploy na Vercel (2 minutos) ⭐ O MOMENTO IMPORTANTE

### Como fazer:

1. **Você está na página do Vercel**

2. **Clique em:** `Create New Project` (botão grande)

3. **Procure seu repositório:**
   - Busque por: `braspress-extractor`
   - Clique no repositório que aparece

4. **Tela de configuração:**
   - **Deixe tudo como está** (padrão)
   - Não precisa mexer em nada

5. **Clique em `Deploy`** (botão azul)

6. **Aguarde a compilação**
   - Verá uma tela com "Building..."
   - Pode levar 1-2 minutos
   - **Não feche a página!**

7. **Quando aparecer `Congratulations!`**
   - Seu app está VIVO! 🎉

---

## ✅ PASSO 6: Testar Seu App (1 minuto)

### Como fazer:

1. **Procure o link:**
   - Na página do Vercel, procure por:
   ```
   https://braspress-extractor.vercel.app
   ```

2. **Clique neste link** (ou copie e cole no navegador)

3. **Você verá seu app!**
   - Campo para digitar CNPJ
   - Botão "Buscar"

4. **Teste:**
   - Digite: `11222333000181`
   - Clique em `Buscar`
   - Deve aparecer dados da empresa ✅

---

## 🎉 PRONTO! Seu App Está Ao Vivo!

Agora você tem um link:
```
https://braspress-extractor.vercel.app
```

**Pode compartilhar com qualquer pessoa!**

---

## 📝 Resumo Visual

```
GitHub:              → Vercel:           → Ao Vivo:
Conta + Repo        Deploy automático   https://...
(5 min)             (10 min)            app funcionando
```

---

## ❓ Se Aparecer Erro no Passo 3

### "git is not installed"
- Baixe Git em: https://git-scm.com/download/win
- Execute o instalador
- Tente novamente

### "permission denied"
- Significa que digitou algo errado
- Verifique username do GitHub
- Tente de novo

### Outro erro?
- Simplesmente **tente os passos de novo**
- 99% das vezes funciona na segunda tentativa

---

## 🆘 Se Travou em Algum Passo

### Passo 1-2 (GitHub)
- Muito fácil, não tem erro
- Se não funcionar, tente outro navegador

### Passo 3 (Git Push)
- Erros mais comuns:
  - Digitou username errado → Verifique
  - Esqueceu de fazer `git add .` → Repita
  - Tente tudo de novo, funciona!

### Passo 4-5 (Vercel)
- Clique em `Create New Project` novamente
- Selecione o repositório
- Clique em Deploy
- Pronto!

### Passo 6 (Teste)
- Não consegue ver o link?
  - Va em: https://vercel.com
  - Clique no projeto `braspress-extractor`
  - O link está lá

---

## 🎓 O Que Você Fez

Parabéns! Você:

✅ Criou conta GitHub
✅ Subiu código online
✅ Criou conta Vercel
✅ Deployou automaticamente
✅ Seu app está VIVO na internet

**Ninguém precisa instalar nada. Basta abrir o link!**

---

## 🚀 Próximo Passo (Opcional - Próxima Semana)

Se quiser ganhar dinheiro:

1. Integrar Stripe (pagamentos)
2. Criar planos (Free/Pro/Enterprise)
3. Vender!

Mas por enquanto, seu app está online e funcionando. 🎉

---

## 📞 Dúvidas?

Se algo não funcionar:

1. **Verifique cada passo** (às vezes pulamos um sem querer)
2. **Tente de novo** (99% das vezes na segunda tentativa funciona)
3. **Google:** "git push erro Windows" + sua mensagem de erro
4. **Vercel Docs:** https://vercel.com/docs

---

## ✨ Você é incrível!

Você acabou de:
- Colocar um app ao vivo
- Sem instalar nada no PC de ninguém
- Gratuitamente
- Em 15 minutos

**Você é um founder SaaS! 🚀**

Parabéns! 🎊

