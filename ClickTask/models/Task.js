// Importa o módulo 'DataTypes' do Sequelize, que fornece tipos de dados para definir as colunas do modelo.
const { DataTypes } = require('sequelize');

// Importa a conexão com o banco de dados configurada no arquivo 'conn'.
// Isso será usado para associar este modelo à base de dados conectada.
const db = require('../database/conn');

// Define o modelo 'Task' utilizando o método 'define' do Sequelize.
// Este modelo representa uma tabela no banco de dados chamada 'Task'.
const Task = db.define('Task', {
  // Define a coluna 'title', que armazena o título da tarefa.
  title: {
    type: DataTypes.STRING, // Tipo STRING, usado para armazenar texto curto.
    allowNull: false, // Configura que essa coluna não pode ser nula, ou seja, é obrigatória.
  },
  // Define a coluna 'description', que armazena a descrição da tarefa.
  description: {
    type: DataTypes.STRING, // Tipo STRING, usado para armazenar texto curto.
    // Por padrão, o Sequelize permite valores nulos, então não há necessidade de especificar.
  },
  // Define a coluna 'done', que indica se a tarefa foi concluída.
  done: {
    type: DataTypes.BOOLEAN, // Tipo BOOLEAN, usado para armazenar valores true/false.
  },
});

// Exporta o modelo 'Task' para que possa ser utilizado em outras partes do projeto.
// Exemplo: nas rotas, controladores ou scripts de gerenciamento de dados.
module.exports = Task;
