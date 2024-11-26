const {Sequelize} = require('sequelize') //

const sequelize = new Sequelize('db_user', 'postgres','BemVindo!',{

    host: 'localhost',
    dialect: 'postgres',


})

try{
    sequelize.authenticate()
    console.log('Banco de dados conectado com sucesso ao sequelize.')
}catch(err){

    console.log('Erro ao conectar o banco de dados com o sequelize', err)
}



module.exports = sequelize