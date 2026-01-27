// Busca por nicho usando Google Places API
// Retorna dados REAIS de empresas

async function searchGoogleMaps(niche, region, apiKey) {
  const results = [];

  try {
    if (!apiKey) {
      console.error('Chave de API do Google não configurada');
      return [];
    }

    const query = `${niche} em ${region}`;
    console.log(`Buscando: ${query}`);

    // 1. Buscar locais usando Text Search
    const textSearchUrl = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json');
    textSearchUrl.searchParams.append('query', query);
    textSearchUrl.searchParams.append('key', apiKey);

    const searchResponse = await fetch(textSearchUrl.toString());
    const searchData = await searchResponse.json();

    if (!searchData.results || searchData.results.length === 0) {
      console.log(`Nenhum resultado encontrado para: ${query}`);
      return [];
    }

    console.log(`Encontrados ${searchData.results.length} resultados`);

    // 2. Para cada resultado, pegar detalhes (nome, telefone, website, endereço, rating)
    for (const place of searchData.results.slice(0, 20)) {
      try {
        // Buscar detalhes do lugar
        const detailsUrl = new URL('https://maps.googleapis.com/maps/api/place/details/json');
        detailsUrl.searchParams.append('place_id', place.place_id);
        detailsUrl.searchParams.append('fields', 'formatted_phone_number,website,formatted_address,rating,name,opening_hours');
        detailsUrl.searchParams.append('key', apiKey);

        const detailsResponse = await fetch(detailsUrl.toString());
        const detailsData = await detailsResponse.json();

        if (detailsData.result) {
          const result = detailsData.result;
          
          // Extrair email do website (opcional)
          let email = 'Não informado';
          if (result.website) {
            email = await extractEmailFromWebsite(result.website).catch(() => 'Não informado');
          }

          results.push({
            nome: result.name || place.name || 'Sem nome',
            telefone: result.formatted_phone_number || 'Não informado',
            email: email,
            endereco: result.formatted_address || place.formatted_address || 'Não informado',
            avaliacao: result.rating ? result.rating.toFixed(1) : 'Sem avaliação'
          });
        }
      } catch (error) {
        console.log(`Erro ao processar detalhes: ${error.message}`);
      }
    }

    console.log(`Total de empresas extraídas: ${results.length}`);
    return results;

  } catch (error) {
    console.error('Erro na busca por nicho:', error.message);
    return [];
  }
}

// Tentar extrair email do website
async function extractEmailFromWebsite(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 5000
    });

    if (!response.ok) return null;

    const html = await response.text();
    const emailMatch = html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    return emailMatch ? emailMatch[0] : null;
  } catch (error) {
    return null;
  }
}

module.exports = { searchGoogleMaps };
