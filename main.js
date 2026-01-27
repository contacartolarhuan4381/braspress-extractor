const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { createObjectCsvWriter } = require("csv-writer");
const fs = require('fs');

const searchCNPJ = require("./scraper/cnpjScraper");
const exportCsv = require("./export/exportCsv");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 850,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  win.loadFile(path.join(__dirname, "ui", "index.html"));
}

ipcMain.handle("search-cnpj", async (_, params) => {
  try {
    const data = await searchCNPJ(params);
    return { ok: true, data };
  } catch (err) {
    const errorMsg = err?.message || String(err);
    return { ok: false, error: errorMsg };
  }
});

ipcMain.handle("export-lead", async (_, params) => {
  try {
    await exportCsv(params.data, true);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err?.message || String(err) };
  }
});

ipcMain.handle("process-batch-cnpj", async (_, params) => {
  const results = [];
  let success = 0;

  for (let i = 0; i < params.cnpjs.length; i++) {
    const cnpj = params.cnpjs[i];
    try {
      const data = await searchCNPJ({ cnpj });
      results.push({ ok: true, cnpj, data });
      success++;
    } catch (err) {
      results.push({ ok: false, cnpj, error: err.message });
    }
    
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  return { results, success };
});

ipcMain.handle("export-batch-csv", async (_, params) => {
  try {
    const csvPath = path.join(__dirname, 'leads.csv');
    
    const writer = createObjectCsvWriter({
      path: csvPath,
      header: [
        { id: "nome", title: "Nome/Razão Social" },
        { id: "telefone", title: "Telefone" },
        { id: "email", title: "Email" },
        { id: "endereco", title: "Endereço" },
      ],
    });

    const records = params.results.map(d => ({
      nome: d.nome || d.razao_social,
      telefone: d.telefone,
      email: d.email,
      endereco: d.endereco,
    }));

    await writer.writeRecords(records);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
});

ipcMain.handle("parse-excel", async (_, params) => {
  try {
    const XLSX = require('xlsx');
    const buffer = Buffer.from(params.file);
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);
    
    const cnpjs = data.map(row => {
      const firstCol = Object.values(row)[0];
      return String(firstCol).replace(/\D/g, '');
    }).filter(c => c.length === 14);
    
    return cnpjs;
  } catch (err) {
    throw new Error('Erro ao ler arquivo Excel: ' + err.message);
  }
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});