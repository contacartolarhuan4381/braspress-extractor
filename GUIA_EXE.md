# 🚀 GUIA RÁPIDO: CRIAR EXECUTÁVEL (.exe) DO BRASPRESS EXTRACTOR

## ⏱️ 3 PASSOS SIMPLES (10 minutos)

### PASSO 1️⃣: Instalar electron-builder
```bash
npm install --save-dev electron-builder
```
Espere terminar...

### PASSO 2️⃣: Gerar o executável
```bash
npm run build
```

**Vai aparecer:**
```
✔ Packaged for windows
  dist/Braspress Extractor Setup 1.0.0.exe
```

### PASSO 3️⃣: Pronto! 🎉
O executável está em: **`dist/Braspress Extractor Setup 1.0.0.exe`**

---

## 📥 COMO USAR O EXECUTÁVEL

1. **Abrir** `dist/Braspress Extractor Setup 1.0.0.exe`
2. Clique em "Install"
3. Escolha pasta de instalação
4. App instala automaticamente
5. Atalho no Desktop/Menu Iniciar

**Pronto! Agora qualquer pessoa pode usar sem precisar de Node.js!**

---

## 📤 COMPARTILHAR COM OUTROS

### Opção A: Compartilhamento Direto
- Comprima `dist/Braspress Extractor Setup 1.0.0.exe` em ZIP
- Envie por email ou WhatsApp
- Outros usuários baixam e executam

### Opção B: Google Drive
1. Vá a [drive.google.com](https://drive.google.com)
2. Faça upload do `.exe`
3. Clique direito > "Compartilhar"
4. Copie link
5. Compartilhe o link

### Opção C: GitHub Releases (Profissional)
1. Vá a seu repositório GitHub
2. Clique "Releases"
3. "Create new release"
4. Faça upload do `.exe`
5. Publicar
6. Qualquer pessoa pode baixar em: `github.com/seu-usuario/repo/releases`

---

## 🔧 SOLUÇÃO DE PROBLEMAS

### "electron-builder não funciona"
```bash
npm install --save-dev electron-builder
npm run build
```

### "Erro de certificado" (pode ignorar no Windows 10+)
- Clique em "More info" ao instalar
- "Run anyway"
- É porque não é certificado digitalmente

### "Arquivo muito grande"
- Normal! Electron embarca Chromium (~200MB)
- Comprima em ZIP para enviar

---

## 📊 O QUE MUDA NO EXECUTÁVEL?

**Antes (desenvolvimento):**
```bash
npm start
```
Precisa Node.js + npm instalados

**Depois (executável):**
Clica 2x no `.exe` → App abre
Ninguém precisa de Node.js!

---

## ✨ PRÓXIMAS MELHORIAS OPCIONAIS

1. **Adicionar logo custom**
   - Salve imagem em `build/icon.ico`
   - Rode `npm run build` novamente

2. **Criar instalador portátil (não precisa instalar)**
   - Mude em `package.json`:
   ```json
   "win": {
     "target": ["portable"]
   }
   ```

3. **Auto-atualizar**
   - Use Electron-updater
   - Mais complexo, mas útil para produção

---

## 🎯 CHECKLIST PARA DISTRIBUIR

- [ ] Testou o `.exe` em outro PC?
- [ ] Funciona offline?
- [ ] Leads.csv salva corretamente?
- [ ] Comprimiu em ZIP?
- [ ] Compartilhou o link?

---

**Pronto! Seu app está profissional e pronto para distribuir!** 🚀
