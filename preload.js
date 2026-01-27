const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  searchCNPJ: (params) => ipcRenderer.invoke("search-cnpj", params),
  exportLead: (params) => ipcRenderer.invoke("export-lead", params),
  processBatchCNPJ: (params) => ipcRenderer.invoke("process-batch-cnpj", params),
  parseExcel: (params) => ipcRenderer.invoke("parse-excel", params),
  exportBatchCSV: (params) => ipcRenderer.invoke("export-batch-csv", params),
  onLog: (cb) => ipcRenderer.on("log", (_, msg) => cb(msg)),
});