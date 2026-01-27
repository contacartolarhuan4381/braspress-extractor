require('dotenv').config({ path: '.env.local' });

const { searchGoogleMaps } = require('./scraper/searchNiche.js');

const apiKey = process.env.GOOGLE_PLACES_API_KEY;

console.log('=== TESTE DE API ===\n');
console.log(`API Key carregada: ${apiKey ? apiKey.substring(0, 15) + '...' : 'NÃO ENCONTRADA'}\n`);

(async () => {
  console.log('Buscando: pizzaria em sao paulo\n');
  
  const results = await searchGoogleMaps('pizzaria', 'sao paulo', apiKey);
  
  console.log(`\nTotal de resultados: ${results.length}\n`);
  
  if (results.length > 0) {
    console.log('Primeiros 3 resultados:');
    console.log('='.repeat(70));
    results.slice(0, 3).forEach((r, i) => {
      console.log(`\n${i+1}. ${r.nome}`);
      console.log(`   Avaliação: ⭐ ${r.avaliacao}`);
      console.log(`   Telefone: ${r.telefone}`);
      console.log(`   Email: ${r.email}`);
      console.log(`   Endereço: ${r.endereco}`);
    });
  }
  
  process.exit(0);
})();
