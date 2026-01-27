// VARIÁVEIS GLOBAIS
let currentSearchResult = null;
let batchResults = [];

function switchTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-button').forEach(el => el.classList.remove('active'));
  document.getElementById(tabName).classList.add('active');
  event.target.classList.add('active');
}

function cleanCNPJ(cnpj) {
  return cnpj.replace(/\D/g, '');
}

function validateCNPJ(cnpj) {
  const clean = cleanCNPJ(cnpj);
  if (clean.length !== 14) return false;
  
  let size = clean.length - 2;
  let numbers = clean.substring(0, size);
  let digits = clean.substring(size);
  let sum = 0;
  let pos = size - 7;
  
  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }
  
  let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
  if (result !== parseInt(digits.charAt(0))) return false;

  size = size + 1;
  numbers = clean.substring(0, size);
  sum = 0;
  pos = size - 7;
  
  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }
  
  result = sum % 11 < 2 ? 0 : 11 - sum % 11;
  return result === parseInt(digits.charAt(1));
}

async function searchSingleCNPJ(cnpj) {
  if (!cnpj) {
    alert('Por favor, insira um CNPJ');
    return;
  }

  if (!validateCNPJ(cnpj)) {
    alert('CNPJ inválido');
    return;
  }

  const clean = cleanCNPJ(cnpj);
  const logBox = document.getElementById('logBox');
  logBox.innerText = 'Buscando dados...\n';
  document.getElementById('search').disabled = true;
  document.getElementById('resultCard').style.display = 'none';

  try {
    const result = await window.api.searchCNPJ({ cnpj: clean });
    
    if (result.ok) {
      currentSearchResult = result.data;
      
      // Mostra resultado
      document.getElementById('resultNome').innerText = result.data.nome;
      document.getElementById('resultTelefone').innerText = result.data.telefone;
      document.getElementById('resultEndereco').innerText = result.data.endereco;
      document.getElementById('resultEmail').innerText = result.data.email;
      document.getElementById('resultCard').style.display = 'block';

      logBox.innerText = '✅ CNPJ encontrado e carregado!\n';
      logBox.innerText += `\n📋 ${result.data.nome}`;
      logBox.innerText += `\n📞 ${result.data.telefone}`;
      logBox.innerText += `\n📍 ${result.data.endereco}`;
      logBox.innerText += `\n📧 ${result.data.email}`;
    } else {
      logBox.innerText = `❌ Erro: ${result.error}`;
      document.getElementById('resultCard').style.display = 'none';
    }
  } catch (err) {
    logBox.innerText = `❌ Erro: ${err.message}`;
    document.getElementById('resultCard').style.display = 'none';
  } finally {
    document.getElementById('search').disabled = false;
  }
}

async function saveSingleToCSV() {
  if (!currentSearchResult) {
    alert('Nenhum resultado para salvar');
    return;
  }
  
  const result = await window.api.exportLead({ 
    cnpj: currentSearchResult.cnpj, 
    data: currentSearchResult 
  });
  
  if (result.ok) {
    alert('✅ Salvo em leads.csv com sucesso!');
  }
}

function copyPhoneOnly() {
  if (!currentSearchResult) return;
  const phone = currentSearchResult.telefone.replace(/\D/g, '');
  navigator.clipboard.writeText(phone);
  alert(`✅ Copiado: ${phone}`);
}

function copyEmailOnly() {
  if (!currentSearchResult) return;
  navigator.clipboard.writeText(currentSearchResult.email);
  alert(`✅ Copiado: ${currentSearchResult.email}`);
}

// ===== MODO LOTE =====
let uploadedFile = null;

document.getElementById('fileInput').onchange = function(e) {
  uploadedFile = e.target.files[0];
  if (uploadedFile) {
    document.getElementById('fileInfo').style.display = 'block';
    document.getElementById('fileInfo').innerText = `📁 ${uploadedFile.name}`;
    document.getElementById('processBtn').disabled = false;
  }
};

async function processBatch() {
  if (!uploadedFile) {
    alert('Selecione um arquivo');
    return;
  }

  const logBox = document.querySelectorAll('#logBox')[1];
  logBox.innerText = 'Processando arquivo...\n';
  document.getElementById('processBtn').disabled = true;
  batchResults = [];

  try {
    const text = await uploadedFile.text();
    let cnpjs = [];

    if (uploadedFile.name.endsWith('.xlsx')) {
      cnpjs = await window.api.parseExcel({ file: await uploadedFile.arrayBuffer() });
    } else {
      const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      cnpjs = lines.map(line => cleanCNPJ(line)).filter(c => c.length === 14);
    }

    if (cnpjs.length === 0) {
      logBox.innerText = '❌ Nenhum CNPJ válido encontrado';
      document.getElementById('processBtn').disabled = false;
      return;
    }

    logBox.innerText = `✅ ${cnpjs.length} CNPJs encontrados\n`;
    logBox.innerText += 'Iniciando busca...\n\n';

    document.getElementById('progressBar').style.display = 'block';

    const results = await window.api.processBatchCNPJ({ cnpjs });
    batchResults = results.results.filter(r => r.ok).map(r => r.data);

    logBox.innerText = '';
    results.results.forEach((r, i) => {
      if (r.ok) {
        logBox.innerText += `✅ ${r.data.nome}\n`;
      } else {
        logBox.innerText += `❌ ${r.cnpj}: ${r.error}\n`;
      }
    });

    logBox.innerText += `\n═══════════════════════════════════\n`;
    logBox.innerText += `✅ ${results.success}/${cnpjs.length} CNPJs processados\n`;

    // Mostra botão de download
    document.getElementById('downloadBatchCSV').style.display = 'inline-block';

    document.getElementById('progressBar').style.display = 'none';
  } catch (err) {
    logBox.innerText = `❌ Erro: ${err.message}`;
  } finally {
    document.getElementById('processBtn').disabled = false;
  }
}

async function downloadBatchCSV() {
  if (batchResults.length === 0) {
    alert('Nenhum resultado para baixar');
    return;
  }

  const result = await window.api.exportBatchCSV({ results: batchResults });
  if (result.ok) {
    alert(`✅ ${batchResults.length} registros exportados para leads.csv`);
  }
}

// LISTENERS
document.getElementById('search').onclick = () => {
  searchSingleCNPJ(document.getElementById('cnpj').value.trim());
};

document.getElementById('cnpj').onkeypress = (e) => {
  if (e.key === 'Enter') {
    searchSingleCNPJ(document.getElementById('cnpj').value.trim());
  }
};