// Carrega variáveis de ambiente do arquivo .env para o objeto process.env.
// As variáveis de ambiente são usadas para armazenar informações sensíveis, como credenciais do banco de dados.
require('dotenv').config();

// Importa o módulo Sequelize, que é um ORM (Object-Relational Mapping) para trabalhar com bancos de dados relacionais.
const { Sequelize } = require('sequelize');

// Cria uma instância do Sequelize para configurar a conexão com o banco de dados.
// Os parâmetros para a conexão (nome do banco, usuário, senha, host e dialeto) são obtidos das variáveis de ambiente.
const sequelize = new Sequelize(
    process.env.DB_NAME, // Nome do banco de dados
    process.env.DB_USER, // Usuário do banco
    process.env.DB_PASSWORD, // Senha do banco
    {
        host: process.env.DB_HOST, // Endereço do servidor do banco (ex.: localhost)
        dialect: process.env.DB_DIALECT, // Dialeto do banco (ex.: 'mysql', 'postgres', 'sqlite')
    }
);

// Testando a conexão com o banco de dados para garantir que está funcionando corretamente.
try {
    sequelize.authenticate(); // Método que tenta autenticar a conexão.
    console.log('Conectamos com sucesso ao Sequelize'); // Mensagem de sucesso no terminal.
} catch (err) {
    console.log('Não foi possível conectar: ', err); // Exibe o erro caso a conexão falhe.
}

// Exporta a instância do Sequelize para que ela possa ser utilizada em outros arquivos.
// Por exemplo, pode ser usada para definir modelos ou realizar operações no banco.
module.exports = sequelize;
