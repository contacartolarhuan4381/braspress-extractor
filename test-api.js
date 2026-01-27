const http = require('http');

console.log('⏳ Iniciando testes...');

// Teste 1: Health Check
const testHealth = () => {
  console.log('📡 Testando Health Check...');
  
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/health',
    method: 'GET',
    timeout: 5000
  };
  
  const req = http.request(options, (res) => {
    console.log('✅ Conectado! Status:', res.statusCode);
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('   Resposta:', data);
      testSearch();
    });
  });
  
  req.on('error', (e) => {
    console.log('❌ Erro:', e.message);
    console.log('   Tipo:', e.code);
    process.exit(1);
  });
  
  req.on('timeout', () => {
    console.log('❌ Timeout na conexão');
    req.destroy();
    process.exit(1);
  });
  
  req.end();
};

// Teste 2: Search CNPJ
const testSearch = () => {
  console.log('\n📡 Testando Search CNPJ...');
  
  const data = JSON.stringify({ cnpj: '11222333000181' });
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/search',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    },
    timeout: 5000
  };
  
  const req = http.request(options, (res) => {
    console.log('✅ Conectado! Status:', res.statusCode);
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      try {
        const result = JSON.parse(body);
        console.log('   OK:', result.ok);
        if (result.data) {
          console.log('   Nome:', result.data.nome);
          console.log('   Telefone:', result.data.telefone);
        }
        console.log('\n✅ TUDO FUNCIONANDO!');
      } catch (e) {
        console.log('   Resposta raw:', body);
      }
      process.exit(0);
    });
  });
  
  req.on('error', (e) => {
    console.log('❌ Erro:', e.message);
    console.log('   Tipo:', e.code);
    process.exit(1);
  });
  
  req.on('timeout', () => {
    console.log('❌ Timeout na conexão');
    req.destroy();
    process.exit(1);
  });
  
  req.write(data);
  req.end();
};

console.log('Aguardando 2 segundos...\n');
setTimeout(testHealth, 2000);
