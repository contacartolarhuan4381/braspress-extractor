# 🆘 Troubleshooting - Se Algo Não Funcionar

Se você ficou preso em algum passo, esta página resolve!

---

## ❌ PASSO 1: GitHub - Problemas

### ❌ Erro: "Email already exists"
**Significa:** Você já tem conta com este email

**Solução:**
1. Clique em `Log in` em vez de `Sign up`
2. Use sua senha
3. Pronto!

---

### ❌ Erro: "Username is not available"
**Significa:** Alguém já usou este nome

**Solução:**
1. Digite outro username
2. Exemplo: `seunomedeusuario2026`
3. Ou: `seu_nome_123`
4. Continue

---

### ❌ Erro: "Invalid email format"
**Significa:** Você digitou email errado

**Solução:**
1. Digite corretamente: `seu@gmail.com`
2. Não esqueça o `@` e o `.com`

---

## ❌ PASSO 2: GitHub Repo - Problemas

### ❌ Não consegui achar o botão "Create repository"
**Solução:**
1. Clique no `+` verde (canto superior direito)
2. Selecione `New repository`
3. Pronto!

---

### ❌ Botão "Create repository" não funciona
**Solução:**
1. Recarregue a página (Ctrl + R)
2. Tente de novo
3. Se não funcionar, tente outro navegador

---

## ❌ PASSO 3: Git Push - Problemas (Mais Comum!)

### ❌ Erro: "git is not installed"
```
'git' is not recognized as an internal or external command
```

**Significa:** Seu PC não tem Git

**Solução:**
1. Baixe Git: `https://git-scm.com/download/win`
2. Execute o instalador
3. Clique "Next" em tudo (deixe padrão)
4. Reinicie o PC
5. Abra Terminal de novo
6. Tente git push novamente

---

### ❌ Erro: "fatal: not a git repository"
```
fatal: not a git repository (or any of the parent directories): .git
```

**Significa:** Você esqueceu do `git init`

**Solução:**
1. Execute:
```
cd c:\Users\Micro\Desktop\lead-captor
git init
```
2. Depois tente os outros comandos

---

### ❌ Erro: "fatal: 'origin' does not appear to be a 'git' repository"
```
fatal: 'origin' does not appear to be a git repository
```

**Significa:** A URL do GitHub está errada

**Solução:**
1. Volte ao GitHub
2. No seu repositório, clique em `Code` (botão verde)
3. Copie a URL exata
4. Execute:
```
git remote add origin COLE_A_URL_AQUI
```
5. Depois `git push -u origin main`

---

### ❌ Erro: "Please tell me who you are" ou "Author identity unknown"
```
Author identity unknown. Please configure your identity.
```

**Significa:** Você pulou o `git config`

**Solução:**
1. Execute:
```
git config user.email "seu@email.com"
git config user.name "Seu Nome"
```
2. Tente `git push` novamente

---

### ❌ Erro: "Permission denied" ou pedindo senha
```
Permission denied (publickey).
fatal: Could not read from remote repository.
```

**Significa:** GitHub quer confirmar sua identidade

**Solução:**
1. Digite seu **email do GitHub**
2. Digite sua **senha do GitHub**
3. Aperte Enter

---

### ❌ Terminal fica travado após `git push`
**Significa:** Está esperando confirmação

**Solução:**
1. Clique na janela do Terminal
2. Aperte `Enter`
3. Se pedir senha, digite e aperte Enter

---

## ❌ PASSO 4: Vercel Signup - Problemas

### ❌ "This email is already taken"
**Significa:** Conta já existe

**Solução:**
1. Clique em `Log in` em vez de `Sign up`
2. Use sua senha
3. Pronto!

---

### ❌ GitHub não autoriza Vercel
**Significa:** GitHub pergunta se confia

**Solução:**
1. Na tela que apareceu, clique em `Authorize vercel`
2. GitHub envia código para email
3. Copie o código e confirme
4. Pronto!

---

## ❌ PASSO 5: Vercel Deploy - Problemas

### ❌ Não consigo encontrar o repositório
**Solução:**
1. Certifique-se de fazer `git push` no Passo 3
2. Aguarde 30 segundos
3. Recarregue Vercel (Ctrl + R)
4. Tente procurar novamente

---

### ❌ Erro "Framework not detected"
```
Build Command: `npm run build`
Start Command: `npm start`
```

**Solução:**
1. Deixe assim (padrão)
2. Clique em Deploy
3. Vercel vai detectar automaticamente

---

### ❌ Build falhou com erro vermelho
```
Error: ENOENT: no such file or directory
```

**Solução:**
1. Verifique se todos os arquivos foram enviados
2. No terminal local, execute:
```
git status
```
3. Se faltam arquivos:
```
git add .
git commit -m "fix"
git push
```
4. Vercel vai redeploy automaticamente

---

### ❌ Deploy finaliza mas link não funciona
**Solução:**
1. Aguarde mais 1-2 minutos
2. Recarregue o link (Ctrl + R)
3. Se ainda não funcionar:
   - Va em Vercel Dashboard
   - Clique no projeto
   - Clique em "Redeploy" (botão superior)

---

## ❌ PASSO 6: Teste - Problemas

### ❌ Link não carrega (branco em branco)
**Solução:**
1. Recarregue (Ctrl + R)
2. Aguarde 30 segundos
3. Tente em outro navegador
4. Se ainda não funcionar, volte a Vercel e clique "Redeploy"

---

### ❌ Digito CNPJ mas não funciona
**Solução:**
1. Verifique se digitou certo: `11222333000181`
2. Sem pontos, sem barras
3. Clique "Buscar"
4. Se erro, volte a Vercel e veja logs

---

### ❌ Página aparece mas botões não funcionam
**Solução:**
1. Abra DevTools (F12)
2. Vá na aba "Console"
3. Se tiver erros em vermelho, vá a Vercel
4. Clique em "Redeploy"

---

## 🔴 Erro em Vercel que Precisa Ver Logs

### Como ver logs:
1. Vá em: `https://vercel.com`
2. Clique no projeto `braspress-extractor`
3. Clique em "Deployments" (aba superior)
4. Clique no deployment (topo)
5. Vá em "Build Logs"
6. Procure pela mensagem de erro vermelha

### Se vir erro "ENOENT" ou "not found":
- Significa que faltou um arquivo
- Execute no terminal local:
```
git add .
git commit -m "fix files"
git push
```

---

## ✅ O Truque Final: Quando Tudo Falha

Se você ficou completamente travado:

1. **Comece do zero:**
```
cd c:\Users\Micro\Desktop\lead-captor
git status
```

2. **Se aparecer "not a git repo":**
```
git init
git config user.email "seu@email.com"
git config user.name "Seu Nome"
```

3. **Se aparecer "fatal: origin":**
```
git remote remove origin
git remote add origin https://github.com/SEU_USUARIO/braspress-extractor.git
```

4. **Fazer push novamente:**
```
git add .
git commit -m "Reset"
git push -u origin main
```

5. **Vercel vai redeploy automaticamente**

---

## 🎯 Checklist de Verificação

Se nada funciona, verifique:

- [ ] Você fez `git add .`?
- [ ] Você fez `git commit -m "..."` ?
- [ ] Você fez `git push origin main` ?
- [ ] A URL do GitHub está correta?
- [ ] Você tem conta Vercel?
- [ ] Clicou em "Deploy"?
- [ ] Esperou 2 minutos para build?
- [ ] Recarregou a página (Ctrl + R)?

Se tudo ok, tente de novo. Funciona!

---

## 🆘 Último Recurso: Pedir Ajuda

Se nada funcionar:

1. **Google:** Digite "git push erro" + sua mensagem
2. **Stack Overflow:** Procure sua mensagem de erro
3. **ChatGPT:** Cola sua mensagem de erro
4. **Vercel Docs:** https://vercel.com/docs/get-started

---

## 💡 Dica de Ouro

**99% dos erros se resolvem com:**

```
git add .
git commit -m "fix"
git push
```

Se Vercel tiver erro, verá nos logs e você refaz.

É assim que funciona! ✅

---

## 🎉 Você Vai Conseguir!

Tenha certeza:
- Todo desenvolvedor passou por isso
- Erros são normais
- A solução está sempre uma busca no Google
- Você é capaz!

**Não desista!** 💪

