const express = require('express') // atribuindo à minha váriavel, a biblioteca express

const exphbs = require('express-handlebars') // atribuindo à minha variável, a biblioteca express-handlebars

const app = express(); // atribuindo a biblioteca express à uma variável curta para boas práticas

const conn = require('./database/conn') // importando meu arquivo conn

const User = require('../projeto/models/User')

const port = 3000 // definindo porta

app.engine('handlebars', exphbs.engine()) // definindo a engine do meu programa como express handlebars

app.use( // utilizando middleware
    express.urlencoded({
        extended: true,
    })
)

app.set('view engine', 'handlebars') // setando a engine de visualização para o express handlebars

app.use(express.static('public')) // utilizando metodo static para que eu possa importar arquivos estáticos no meu programa

app.get('/', (req, res) => { // utilizando metodo get para renderizar minha pagina principal

    res.render('home')
    console.log('Você está na rota principal')

})





// app.listen(port, ()=>{ // utilizando metodo listen para escutar todas as requisições do meu servidor

//     console.log('Servidor rodando')
// })

conn.sync().then(() => { // sincroniza os dados do banco de dados e depois executa a função 

    app.listen(port, () => {
        console.log('Servidor rodando na porta' + port)
    })
}).catch((err) => {
    console.log(`Erro ao sincronizar com o banco de dados ${err}`)
})