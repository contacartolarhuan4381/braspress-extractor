const { createObjectCsvWriter } = require("csv-writer");
const fs = require('fs');
const path = require('path');

module.exports = async (data, singleRecord = false) => {
  const csvPath = path.join(__dirname, '..', 'leads.csv');
  
  // Se for um registro único, append ao CSV existente
  if (singleRecord) {
    const fileExists = fs.existsSync(csvPath);
    
    const writer = createObjectCsvWriter({
      path: csvPath,
      header: [
        { id: "nome", title: "Nome/Razão Social" },
        { id: "telefone", title: "Telefone" },
        { id: "email", title: "Email" },
        { id: "endereco", title: "Endereço" },
      ],
      append: fileExists,
    });

    await writer.writeRecords([{
      nome: data.nome,
      telefone: data.telefone,
      email: data.email,
      endereco: data.endereco,
    }]);
  } else {
    // Para múltiplos registros (batch)
    const writer = createObjectCsvWriter({
      path: csvPath,
      header: [
        { id: "nome", title: "Nome/Razão Social" },
        { id: "telefone", title: "Telefone" },
        { id: "email", title: "Email" },
        { id: "endereco", title: "Endereço" },
      ],
    });

    const records = data.map(d => ({
      nome: d.nome || d.razao_social,
      telefone: d.telefone,
      email: d.email,
      endereco: d.endereco,
    }));

    await writer.writeRecords(records);
  }
};

