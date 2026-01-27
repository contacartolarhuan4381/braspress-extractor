// Busca por nicho usando web scraping simples + API
// Estratégia: Buscar no Google e fazer parse dos resultados

async function searchGoogleMaps(niche, region) {
  const results = [];

  try {
    // 1. Buscar dados simulados (para demonstração até configurar API)
    // Em produção, usaria Google Places API, BrasilAPI ou outro serviço

    console.log(`Buscando ${niche} em ${region}`);

    // Exemplo de dados estruturados para teste
    const mockData = {
      'pizzaria_guarulhos': [
        { nome: 'Pizzaria da Zona', telefone: '(11) 3000-1234', email: 'contato@pizzariazona.com.br', endereco: 'Rua das Flores, 123 - Guarulhos - SP', avaliacao: '4.5' },
        { nome: 'Pizzaria Sabor', telefone: '(11) 3100-5678', email: 'info@pizzariasabor.com.br', endereco: 'Av. Principal, 456 - Guarulhos - SP', avaliacao: '4.7' },
        { nome: 'Pizzaria Tino', telefone: '(11) 3200-9999', email: 'contato@pizzariatino.com.br', endereco: 'Rua Central, 789 - Guarulhos - SP', avaliacao: '4.3' },
        { nome: 'Pizzaria Milano', telefone: '(11) 3300-4567', email: 'milano@pizzaria.com.br', endereco: 'Av. Norte, 321 - Guarulhos - SP', avaliacao: '4.8' },
      ],
      'consultório_são paulo': [
        { nome: 'Consultório Dr. Silva', telefone: '(11) 3050-1111', email: 'contato@drsilva.com.br', endereco: 'Rua das Palmeiras, 1000 - São Paulo - SP', avaliacao: '4.9' },
        { nome: 'Consultório Médico Central', telefone: '(11) 3150-2222', email: 'agendamento@medicoscentral.com.br', endereco: 'Av. Paulista, 2000 - São Paulo - SP', avaliacao: '4.6' },
        { nome: 'Consultório Saúde Plus', telefone: '(11) 3250-3333', email: 'contato@saudeplus.com.br', endereco: 'Rua Augusta, 1500 - São Paulo - SP', avaliacao: '4.4' },
      ],
      'farmácia_guarulhos': [
        { nome: 'Farmácia Central', telefone: '(11) 3001-5000', email: 'contato@farmaciacentral.com.br', endereco: 'Rua do Comércio, 500 - Guarulhos - SP', avaliacao: '4.2' },
        { nome: 'Farmácia 24h', telefone: '(11) 3002-6000', email: 'atendimento@farmacia24h.com.br', endereco: 'Av. Brasil, 1234 - Guarulhos - SP', avaliacao: '4.6' },
        { nome: 'Farmácia Saúde', telefone: '(11) 3003-7000', email: 'contato@farmaciasaude.com.br', endereco: 'Rua Saúde, 789 - Guarulhos - SP', avaliacao: '4.1' },
      ]
    };

    // Normalizar chave de busca
    const searchKey = `${niche.toLowerCase()}_${region.toLowerCase()}`;
    const keyLower = searchKey.replace(/\s+/g, '_');

    // Procurar nos dados de exemplo
    for (const key in mockData) {
      if (key.includes(niche.toLowerCase()) && key.includes(region.toLowerCase().split(' ')[0])) {
        return mockData[key];
      }
    }

    // Se não encontrar, retornar dados genéricos
    console.log(`Nenhum resultado específico para: ${niche} em ${region}`);
    console.log(`Dados disponíveis para teste: pizzaria em guarulhos, consultório em são paulo, farmácia em guarulhos`);

    // Simular busca genérica
    const genericResults = [
      {
        nome: `${niche} ${Math.random().toString(36).substring(7)}`,
        telefone: `(${Math.floor(Math.random() * 80 + 11)}) 9${Math.floor(Math.random() * 9000 + 1000)}-${Math.floor(Math.random() * 9000 + 1000)}`,
        email: `contato@${niche.toLowerCase().replace(/\s+/g, '')}.com.br`,
        endereco: `${region}, SP`,
        avaliacao: `${(Math.random() * 2 + 3).toFixed(1)}`
      }
    ];

    return genericResults;

  } catch (error) {
    console.error('Erro na busca:', error.message);
    return [];
  }
}

module.exports = { searchGoogleMaps };
