const https = require('https');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

module.exports = async ({ query, limit }) => {
  const leads = [];
  
  // Dados mockados realistas para demonstração
  const mockDatabase = {
    'imobiliárias': [
      { name: 'Imobiliária Premium', phone: '(11) 3456-7890', email: 'contato@premium.com.br', website: 'https://www.premiumimob.com.br', mapsUrl: 'https://maps.google.com/maps?q=Imobi%C3%A1ria+Premium' },
      { name: 'Imóveis Brasil', phone: '(11) 2345-6789', email: 'vendas@imoveisbrasil.com.br', website: 'https://www.imoveisbrasil.com.br', mapsUrl: 'https://maps.google.com/maps?q=Im%C3%B3veis+Brasil' },
      { name: 'Era Imóveis', phone: '(11) 4567-8901', email: 'info@eraimoveis.com.br', website: 'https://www.eraimoveis.com.br', mapsUrl: 'https://maps.google.com/maps?q=Era+Im%C3%B3veis' },
      { name: 'Vivaz Imobiliária', phone: '(11) 5678-9012', email: 'suporte@vivazimob.com.br', website: 'https://www.vivazimob.com.br', mapsUrl: 'https://maps.google.com/maps?q=Vivaz' },
      { name: 'Chaves de Ouro', phone: '(11) 6789-0123', email: 'atendimento@chavesdeouro.com.br', website: 'https://www.chavesdeouro.com.br', mapsUrl: 'https://maps.google.com/maps?q=Chaves+de+Ouro' },
    ],
    'restaurantes': [
      { name: 'Sabor Autêntico', phone: '(11) 3333-4444', email: 'reservas@saborautentico.com.br', website: 'https://www.saborautentico.com.br', mapsUrl: 'https://maps.google.com/maps?q=Sabor+Aut%C3%AAntico' },
      { name: 'Casa da Gastronomia', phone: '(11) 4444-5555', email: 'contato@casagastronomia.com.br', website: 'https://www.casagastronomia.com.br', mapsUrl: 'https://maps.google.com/maps?q=Casa+da+Gastronomia' },
    ],
    'agências de publicidade': [
      { name: 'Digital Max', phone: '(11) 2222-3333', email: 'oi@digitalmax.com.br', website: 'https://www.digitalmax.com.br', mapsUrl: 'https://maps.google.com/maps?q=Digital+Max' },
      { name: 'Criativa 360', phone: '(11) 5555-6666', email: 'vendas@criativa360.com.br', website: 'https://www.criativa360.com.br', mapsUrl: 'https://maps.google.com/maps?q=Criativa+360' },
    ],
    'default': [
      { name: 'Empresa ' + Math.random().toString(36).substring(7), phone: '(11) ' + Math.floor(Math.random() * 9000 + 1000) + '-' + Math.floor(Math.random() * 9000 + 1000), email: 'contato@empresa.com.br', website: 'https://www.empresa.com.br', mapsUrl: 'https://maps.google.com' },
      { name: 'Empresa ' + Math.random().toString(36).substring(7), phone: '(11) ' + Math.floor(Math.random() * 9000 + 1000) + '-' + Math.floor(Math.random() * 9000 + 1000), email: 'info@empresa.com.br', website: 'https://www.empresa.com.br', mapsUrl: 'https://maps.google.com' },
    ]
  };

  // Busca no mock database
  const searchKey = Object.keys(mockDatabase).find(key => query.toLowerCase().includes(key));
  const results = mockDatabase[searchKey] || mockDatabase.default;

  // Retorna até o limite solicitado
  leads.push(...results.slice(0, limit));

  return leads;
};