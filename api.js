const https = require('https');

function fetchJson(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const defaultHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    };

    https.get(url, { headers: { ...defaultHeaders, ...headers } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(JSON.parse(data));
          } else {
            reject(new Error(`Erro HTTP ${res.statusCode}`));
          }
        } catch (e) {
          reject(new Error('Erro ao processar resposta'));
        }
      });
    }).on('error', reject);
  });
}

function cleanPhone(phone) {
  if (!phone) return null;
  const cleaned = String(phone).replace(/\D/g, '');
  
  if (cleaned.length === 11) {
    // Celular: (11) 999999999
    return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2)}`;
  } else if (cleaned.length === 10) {
    // Fixo: (11) 9999-9999
    return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 6)}-${cleaned.substring(6)}`;
  }
  return phone;
}

async function searchReceitaWS(cnpj) {
  try {
    const url = `https://www.receitaws.com.br/v1/cnpj/${cnpj}`;
    const data = await fetchJson(url);
    return {
      telefone: data.telefone ? cleanPhone(data.telefone) : null,
      email: data.email || null,
      razao_social: data.nome,
      nome_fantasia: data.nome_fantasia || data.nome,
      logradouro: data.logradouro,
      numero: data.numero,
      complemento: data.complemento,
      municipio: data.municipio,
      uf: data.uf,
      cep: data.cep,
      situacao: data.situacao,
      data_abertura: data.abertura,
    };
  } catch (e) {
    return null;
  }
}

async function searchBrasilAPI(cnpj) {
  try {
    const url = `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`;
    const data = await fetchJson(url);
    
    let telefone = null;
    let email = null;
    
    if (data.ddd && data.telefone) {
      const fullPhone = `${data.ddd}${data.telefone}`;
      telefone = cleanPhone(fullPhone);
    }
    if (data.email) {
      email = data.email;
    }

    return {
      cnpj: data.cnpj,
      razao_social: data.razao_social || data.company_name,
      nome_fantasia: data.nome_fantasia || data.trade_name,
      logradouro: data.logradouro,
      numero: data.numero,
      complemento: data.complemento,
      municipio: data.municipio || data.city,
      uf: data.uf || data.state,
      cep: data.cep,
      telefone: telefone,
      email: email,
      situacao: data.descricao_situacao || data.status,
      data_abertura: data.data_inicio_atividade,
      natureza: data.descricao_natureza_juridica,
      atividade: data.cnae_fiscal_descricao,
    };
  } catch (e) {
    return null;
  }
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { cnpj } = req.body;

    if (!cnpj || cnpj.replace(/\D/g, '').length !== 14) {
      return res.status(400).json({ error: 'CNPJ inválido' });
    }

    const clean = cnpj.replace(/\D/g, '');

    let data = await searchReceitaWS(clean);
    
    if (!data || (!data.telefone && !data.email)) {
      const brasilData = await searchBrasilAPI(clean);
      if (brasilData) {
        data = { ...brasilData, ...data };
      }
    }

    if (!data) {
      return res.status(404).json({ error: 'CNPJ não encontrado' });
    }

    const endereco = data.logradouro ? `${data.logradouro}, ${data.numero || ''} - ${data.municipio}/${data.uf}` : 'N/A';

    return res.status(200).json({
      ok: true,
      data: {
        cnpj: clean,
        nome: data.razao_social || 'N/A',
        telefone: data.telefone || 'N/A',
        email: data.email || 'N/A',
        endereco: endereco,
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
