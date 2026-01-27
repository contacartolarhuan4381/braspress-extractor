# 🔍 BRASPRESS EXTRACTOR

## O que é?
Aplicativo desktop Electron para extrair dados completos de empresas a partir de CNPJ (Razão Social, Telefone, Email, Endereço). Suporta busca individual e processamento em lote.

---

## 📋 FUNCIONALIDADES

### ✅ Modo CNPJ Único
- Busca dados completos de 1 CNPJ por vez
- Exibe: Nome, Telefone, Email, Endereço
- Botões rápidos:
  - **Salvar em CSV**: Adiciona ao arquivo leads.csv
  - **Copiar Telefone**: Copia apenas os números do telefone
  - **Copiar Email**: Copia o email

### ✅ Modo Lote
- Carrega múltiplos CNPJs de uma vez
- Suporta:
  - **TXT**: Um CNPJ por linha
  - **Excel (.xlsx)**: CNPJs na primeira coluna
  - **CSV**: Um CNPJ por linha
- Mostra progresso em tempo real
- Botão para baixar CSV com todos os resultados

---

## 🚀 COMO USAR (LOCAL)

### Requisitos
- Node.js 14+ instalado ([Download](https://nodejs.org/))
- Windows, macOS ou Linux

### Passo 1: Clonar/Baixar
```bash
# Opção 1: Clonar do GitHub
git clone https://github.com/seu-usuario/braspress-extractor.git
cd braspress-extractor

# Opção 2: Ou extrair o ZIP
# Extrair a pasta e abrir terminal nela
```

### Passo 2: Instalar dependências
```bash
npm install
```

### Passo 3: Rodar o aplicativo
```bash
npm start
```

O app abrirá automaticamente em uma janela!

---

## 📦 COMO DISTRIBUIR

### Opção 1: Executável Windows (.exe) - Mais Fácil ⭐

#### 1. Instalar Electron Builder
```bash
npm install --save-dev electron-builder
```

#### 2. Atualizar package.json
Adicione ao final do arquivo:
```json
  "build": {
    "appId": "com.braspress.extractor",
    "productName": "Braspress Extractor",
    "files": [
      "main.js",
      "preload.js",
      "ui/**",
      "scraper/**",
      "export/**",
      "node_modules/**"
    ],
    "win": {
      "target": ["nsis", "portable"],
      "icon": "build/icon.ico"
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true
    }
  }
```

#### 3. Criar executável
```bash
npm run build
```

Saída: `dist/Braspress Extractor Setup 1.0.0.exe`

**Pronto! Distribua esse .exe para qualquer Windows!**

---

### Opção 2: Usar Vercel (Grátis, Cloud)

#### 1. Fazer fork no GitHub
1. Crie conta em [GitHub](https://github.com)
2. Clique "Fork" neste repositório
3. Clone para seu computador

#### 2. Deploy na Vercel
1. Acesse [Vercel](https://vercel.com)
2. Conecte sua conta GitHub
3. Clique "Import Project"
4. Selecione seu repositório
5. Deploy automático!

Seu app estará em: `https://seuapp.vercel.app`

---

### Opção 3: Usar GitHub Releases (Recomendado)

#### 1. Fazer build
```bash
npm run build
```

#### 2. Criar release no GitHub
1. Vá em: `Releases` no seu repositório
2. Clique "Create a new release"
3. Versão: `v1.0.0`
4. Faça upload do arquivo: `dist/Braspress Extractor Setup 1.0.0.exe`
5. Publique!

Usuários podem baixar direto de: `github.com/seu-usuario/repo/releases`

---

## 💾 ESTRUTURA DO PROJETO

```
lead-captor/
├── main.js                 # Electron main process
├── preload.js              # Bridge entre renderer e main
├── package.json            # Dependências
├── ui/
│   ├── index.html          # Interface
│   └── renderer.js         # Lógica front-end
├── scraper/
│   └── cnpjScraper.js      # Busca dados CNPJ (ReceitaWS + BrasilAPI)
├── export/
│   └── exportCsv.js        # Exporta para CSV
└── leads.csv               # Resultados salvos
```

---

## 🔌 TECNOLOGIAS

- **Electron**: Aplicativo desktop
- **Node.js**: Backend
- **ReceitaWS API**: Base de dados de CNPJs (maior cobertura)
- **Brasil API**: Fallback para dados
- **XLSX**: Leitura de Excel
- **CSV-Writer**: Export de dados

---

## ⚙️ CONFIGURAÇÕES AVANÇADAS

### Mudar tamanho da janela
Em `main.js`, linha ~10:
```javascript
width: 1200,  // Largura
height: 900,  // Altura
```

### Adicionar logo customizada
Salve uma imagem em `build/icon.ico` antes de fazer build

### Mudar cores
Em `ui/index.html`, procure por `#1e3a8a` (azul) e altere para qualquer cor

---

## 🐛 SOLUÇÃO DE PROBLEMAS

### "CNPJ não encontrado"
- Verifique se o CNPJ está correto
- ReceitaWS é mais rápido que Brasil API
- Alguns CNPJs antigos podem não estar na base

### "Erro de conexão"
- Verifique internet
- As APIs podem estar lentas (espere alguns segundos)

### "Arquivo Excel não funciona"
- Use Excel 2007+ (.xlsx, não .xls)
- CNPJs devem estar na **primeira coluna**

---

## 📊 EXEMPLOS DE USO

### Modo Individual
1. Digite: `11.222.333/0001-81`
2. Clique "Buscar"
3. Dados aparecem em card
4. Clique "Salvar em CSV" para guardar

### Modo Lote
1. Crie arquivo `cnpjs.txt`:
```
11.222.333/0001-81
06.990.590/0001-23
28.014.219/0001-95
```
2. Upload do arquivo
3. Clique "Processar"
4. Aguarde barra de progresso
5. Clique "Baixar CSV"

---

## 📝 LICENÇA

MIT - Use livremente

---

## 🤝 SUPORTE

Dúvidas? Abra uma issue no GitHub ou envie email!

---

**Desenvolvido com ❤️ para captação de leads**
