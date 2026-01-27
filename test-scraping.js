const { searchGoogleMaps } = require('./scraper/searchNiche.js');

(async () => {
  console.log('Testando scraping do Google Maps...');
  console.log('Buscando: pizzaria em sao paulo\n');
  
  const results = await searchGoogleMaps('pizzaria', 'sao paulo', '');
  
  console.log(`Total de resultados: ${results.length}\n`);
  
  if (results.length > 0) {
    console.log('Primeiros 3 resultados:');
    console.log('='.repeat(60));
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
