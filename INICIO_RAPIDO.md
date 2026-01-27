# 🎯 INSTRUÇÕES FINAIS - BRASPRESS EXTRACTOR

## ✨ SEU APP ESTÁ PRONTO!

Parabéns! Seu app de extração de CNPJ está 100% funcional. Aqui está tudo que você precisa saber:

---

## 🎬 COMEÇANDO AGORA

### Opção 1: Usar Localmente (Desenvolvedores)
```bash
npm start
```
App abre na sua máquina. Edite código, teste, melhore!

---

### Opção 2: Distribuir para Outros (Melhor!)

#### Passo 1: Criar Executável
```bash
npm run build
```

**Aparecerá:**
```
✔ Building
  dist/Braspress Extractor Setup 1.0.0.exe
```

#### Passo 2: Compartilhar
- Copie o arquivo `.exe` de `dist/`
- Comprima em ZIP
- Compartilhe por:
  - 📧 Email
  - 💬 WhatsApp
  - 📁 Google Drive
  - 🐙 GitHub Releases

#### Passo 3: Outros Usuários
- Baixam o `.exe`
- Clicam 2x
- App instala + abre automaticamente
- **Pronto!** (Sem precisar Node.js!)

---

## 🎮 COMO USAR O APP

### 🎯 Modo CNPJ Único (Busca 1 por 1)
1. Clique em "🎯 CNPJ Único"
2. Digite um CNPJ (ex: `11.222.333/0001-81`)
3. Pressione Enter ou clique "Buscar"
4. Vê aparecer um card com:
   - **📋 Nome da Empresa**
   - **📞 Telefone** (com DDD)
   - **📧 Email**
   - **📍 Endereço completo**

5. Botões disponíveis:
   - **💾 Salvar em CSV**: Adiciona ao arquivo leads.csv
   - **📋 Copiar Telefone**: Copia só os números (sem formatação)
   - **📧 Copiar Email**: Copia o email direto

### 📊 Modo Lote (Busca vários de uma vez)
1. Clique em "📊 Lote (TXT/Excel)"
2. Clique em "📤 Selecionar Arquivo"
3. Escolha arquivo TXT ou Excel com CNPJs:
   - **TXT**: Um CNPJ por linha
   - **Excel**: CNPJs na primeira coluna
   - **CSV**: Um CNPJ por linha

4. Clique em "▶️ Processar"
5. Aguarde a barra de progresso (1 CNPJ por segundo aprox)
6. Quando terminar, clique em "⬇️ Baixar CSV"
7. Arquivo `leads.csv` aparece com todos os dados!

---

## 📁 ARQUIVOS IMPORTANTES

| Arquivo | O que é |
|---------|---------|
| `README.md` | Manual completo |
| `GUIA_EXE.md` | Como criar .exe |
| `RESUMO.md` | Resumo técnico |
| `leads.csv` | Seus dados salvos |
| `exemplo_cnpjs.txt` | Teste para lote |

---

## 🔧 TROUBLESHOOTING

### "Não achou o CNPJ"
✅ **Solução:**
- Verifique se CNPJ está correto
- Tente outro CNPJ
- Conexão internet funciona?
- APIs podem estar lentas (espere 5 segundos)

### "Erro ao processar lote"
✅ **Solução:**
- Verifique se CNPJs estão válidos
- Em Excel: CNPJs na PRIMEIRA coluna
- Em TXT: Um CNPJ por linha
- Remova linhas em branco

### "App não abre o .exe"
✅ **Solução:**
- Clique em "More info" → "Run anyway"
- Windows avisa porque não tem certificado digital
- É seguro, desenvolvemos aqui!

### "Arquivo CSV não abre no Excel"
✅ **Solução:**
- Clique direito > "Abrir com" > Excel
- Ou: Excel > Arquivo > Abrir > leads.csv
- Use separador: Vírgula (,)

---

## 📊 EXEMPLO PRÁTICO

### Cenário 1: Consultar UMA empresa
```
1. Digite: 14.318.253/0001-16 (Natura)
2. Busca...
3. Resultado:
   Nome: Natura Cosméticos S.A.
   Telefone: (11) 2115-6000
   Email: contato@natura.com.br
   Endereço: Av. Presidente Juscelino Kubitschek...
4. Copia telefone ou salva em CSV
```

### Cenário 2: Processar MÚLTIPLAS empresas
```
1. Cria arquivo "empresas.xlsx":
   Coluna A:
   11.222.333/0001-81
   06.990.590/0001-23
   28.014.219/0001-95

2. Upload do arquivo
3. Clica "Processar"
4. Aguarda barra de progresso (1-2 min)
5. Clica "Baixar CSV"
6. Abre leads.csv com:
   - 3 empresas
   - Nome, telefone, email, endereço
   - Pronto para usar em CRM/email!
```

---

## 🚀 PRÓXIMOS PASSOS RECOMENDADOS

### Se quer melhorar ainda mais:

1. **Integrar com seu CRM**
   - Copie dados de leads.csv
   - Cole em Pipedrive, HubSpot, etc

2. **Automatizar**
   - Crie lotes de CNPJs
   - Execute todo dia
   - Junta tudo em um arquivo

3. **Compartilhar com equipe**
   - Faz .exe
   - Cada membro instala
   - Todos usam no PC deles

4. **Fazer backup**
   - Leve leads.csv para cloud
   - Nunca perde dados

---

## 📞 RESUMO DO QUE FUNCIONA

✅ Buscar dados de qualquer CNPJ válido  
✅ Extrair Telefone + Email (múltiplas fontes)  
✅ Salvar em CSV para importar em CRM  
✅ Copiar dados rápido (telefone/email)  
✅ Processar 100+ CNPJs automaticamente  
✅ Baixar tudo em 1 clique  
✅ Usar offline (após primeira busca)  
✅ Distribuir como .exe (sem Node.js)  
✅ Interface linda e moderna  
✅ Suporte a TXT, Excel, CSV  

---

## 🎓 APRENDIZADO TÉCNICO

Se quer entender o código:

1. **main.js** - Lógica principal (Electron)
2. **renderer.js** - Interface (HTML/JS)
3. **cnpjScraper.js** - Busca dados (APIs)
4. **exportCsv.js** - Salva em arquivo

Tudo comentado e bem estruturado!

---

## 📋 CHECKLIST - VOCÊ ESTÁ PRONTO SE:

- [ ] App abre quando clica npm start
- [ ] Consegue buscar um CNPJ
- [ ] Vê dados aparecer no card
- [ ] Consegue copiar telefone/email
- [ ] Consegue salvar em CSV
- [ ] Consegue processar arquivo TXT
- [ ] Consegue processar arquivo Excel
- [ ] Consegue fazer npm run build sem erros
- [ ] .exe foi criado em dist/

**Se todos ✅, você está 100% pronto!**

---

## 🎁 BÔNUS: Dicas Pro

### 1. Criar atalho no desktop (Windows)
- Copie `dist/Braspress Extractor Setup 1.0.0.exe`
- Clique direito > Enviar para > Desktop (criar atalho)
- Agora tem ícone no Desktop!

### 2. Automatizar com Excel
- Copie CNPJs em Excel coluna A
- Salve como CSV
- Upload em "Lote"
- Resultado volta em CSV pronto!

### 3. Compartilhar via GitHub
```bash
git init
git add .
git commit -m "Braspress Extractor v1.0"
git push origin main
```

### 4. Usar em servidor (futura integração)
```javascript
// Importar módulo para seu backend Node.js
const searchCNPJ = require('./scraper/cnpjScraper');
const data = await searchCNPJ({ cnpj: '11222333000181' });
```

---

## 🏆 VOCÊ CONSEGUIU!

Seu app está:
- ✅ Funcional
- ✅ Profissional  
- ✅ Distribuível
- ✅ Documentado
- ✅ Pronto para vender/usar

**Aproveite e bom proveito com o Braspress Extractor! 🚀**

---

Desenvolvido com ❤️  
Qualquer dúvida, leia README.md ou GUIA_EXE.md
