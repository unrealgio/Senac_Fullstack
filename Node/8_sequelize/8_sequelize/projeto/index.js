const express = require('express') // atribuindo à minha váriavel, a biblioteca express

const exphbs = require('express-handlebars') // atribuindo à minha variável, a biblioteca express-handlebars

const moment = require('moment-timezone');  // Usando moment-timezone para garantir o fuso horário correto

const app = express(); // atribuindo a biblioteca express à uma variável curta para boas práticas

const conn = require('./database/conn') // importando meu arquivo conn

const User = require('../projeto/models/User')

const port = 3000 // definindo porta

app.engine('handlebars', exphbs.engine()) // definindo a engine do meu programa como express handlebars

app.use(express.json());

app.use( // utilizando middleware
    express.urlencoded({
        extended: true,
    })
)

app.set('view engine', 'handlebars') // setando a engine de visualização para o express handlebars

app.use(express.static('public')) // utilizando metodo static para que eu possa importar arquivos estáticos no meu programa

// ROTAS

app.get('/', (req, res) => { // utilizando metodo get para renderizar minha pagina principal

    res.render('home')
    console.log('Você está na rota principal')

})

app.get('/users/create', (req, res) => {
    res.render('adduser'); // Renderiza a página 'adduser.handlebars'
});

app.post('/users/create', async (req, res) => {
    try {
        // formata a data para o horario global, referente ao horário de brasilia
        const formattedDate = moment.tz(req.body.date_of_birth, 'YYYY-MM-DD', 'America/Sao_Paulo').toDate();

        // pegando os dados do formulário
        const name = req.body.name;
        const occupation = req.body.occupation;
        const date_of_birth = formattedDate; // data formatada

        // verifica se a checkbox "newsletter" foi marcada. Se não for enviado no body, considera como "false".
        const newsletter = req.body.newsletter === 'on';

        // aguarda criar o usuário no banco de dados
        await User.create({ name, occupation, date_of_birth, newsletter });

        console.log(req.body); // mostra os dados do corpo do meu site

        res.redirect('/users/listauser'); // redireciona para a lista de usuários
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao criar usuário');
    }
});

app.get('/users/listauser', async (req, res) => {
    try {
        // criando constante users para receber o dado de todos os usuários
        const users = await User.findAll({ raw: true }); // Recupera os dados como objetos simples

        // Renderiza a página e passa os usuários como contexto
        res.render('listauser', { users });
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).send('Erro ao carregar a lista de usuários');
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const id = req.params.id; // Captura o id da URL

        // Verifica se o id é válido
        if (isNaN(id) || id <= 0) {
            return res.status(400).send('ID inválido'); // Retorna um erro se o ID for inválido
        }

        // Busca o usuário pelo ID
        const user = await User.findOne({ raw: true, where: { id: id } });

        if (!user) {
            return res.status(404).send('Usuário não encontrado'); // Retorna um erro se o usuário não existir
        }

        // Renderiza a página 'userunique' com os dados do usuário
        res.render('userunique', { user });
    } catch (error) {
        console.error('Erro ao buscar usuário:', error); // Loga o erro no console
        res.status(500).send('Erro ao carregar os dados do usuário'); // Retorna uma mensagem de erro
    }
});

app.delete('/users/delete/:id', async (req, res) => {
    try {
        const id = req.params.id; // Captura o id da URL

        // Verifica se o id é válido
        if (!id || isNaN(id)) {
            return res.status(400).send('ID inválido.'); // Retorna um erro se o ID for inválido
        }

        // Busca o usuário pelo ID
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).send('Usuário não encontrado.'); // Retorna um erro se o usuário não existir
        }

        // Exclui o usuário
        await User.destroy({ where: { id: id } });
        res.redirect('/users/listauser'); // Redireciona para a lista de usuários
    } catch (error) {
        console.error('Erro ao excluir o usuário:', error); // Loga o erro no console
        res.status(500).send('Erro ao excluir o usuário.'); // Retorna uma mensagem de erro
    }
});

app.get('/users/edituser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log('ID capturado:', id); // Adicione esta linha para verificar o ID

        if (!id || isNaN(id)) { // se o id fornecido for diferente de um ja criado, ou se não for um numero

            return res.status(400).send('ID inválido.');
        }

        const user = await User.findByPk(id, { raw: true });
        if (!user) {
            return res.status(404).send('Usuário não encontrado.');
        }

        res.render('edituser', { user });
    } catch (error) {
        console.error('Erro ao buscar usuário para edição:', error);
        res.status(500).send('Erro ao carregar o formulário de edição.');
    }
});

app.post('/users/update', async (req, res) => {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const occupation = req.body.occupation;
        const date_of_birth = req.body.date_of_birth;
        let newsletter = req.body.newsletter === 'on';

        // Valida os dados
        if (!id || isNaN(id)) {
            return res.status(400).send('ID inválido.');
        }

        if (!name || !occupation || !date_of_birth) {
            return res.status(400).send('Todos os campos são obrigatórios.');
        }

        // Formata a data de nascimento
        const formattedDate = moment(date_of_birth, 'YYYY-MM-DD').toDate();

        // Atualiza o usuário no banco
        const userData = {
            id,
            name,
            occupation,
            date_of_birth: formattedDate,
            newsletter,
        };

        const [affectedRows] = await User.update(userData, {
            where: {
                id: id,
            },
        });

        if (affectedRows === 0) {
            return res.status(404).send('Usuário não encontrado ou nenhuma alteração realizada.');
        }

        res.redirect('/users/listauser');
    } catch (err) {
        console.error('Erro ao atualizar usuário:', err);
        res.status(500).send('Erro ao atualizar o usuário.');
    }
});

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