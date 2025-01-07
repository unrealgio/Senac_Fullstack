// Carrega variáveis de ambiente do arquivo .env para o objeto process.env. 
// Isso permite usar informações sensíveis (como a porta do servidor ou credenciais do banco) sem expô-las no código.
require('dotenv').config();

// Importa o framework Express, usado para criar e gerenciar o servidor web.
const express = require('express');

// Importa o Express Handlebars, um mecanismo de template para renderizar páginas HTML dinâmicas.
const exphbs = require('express-handlebars');

// Cria uma instância do Express, que é o servidor onde serão configuradas rotas, middlewares e outras funcionalidades.
const app = express();

// Importa a configuração do banco de dados, geralmente usada para estabelecer a conexão com um banco relacional (ex.: MySQL, PostgreSQL).
const conn = require('../ClickTask/database/conn');

// Importa o middleware 'method-override', que permite usar métodos HTTP como PUT e DELETE através de formulários HTML.
// Por padrão, formulários HTML só suportam GET e POST.
const methodOverride = require('method-override');

// Define a porta em que o servidor irá rodar. Primeiro tenta usar a variável PORT definida no .env. 
// Se não estiver configurada, usará a porta 3000 por padrão.
const port = process.env.PORT || 3000;

// Importa o modelo de dados 'Task', que representa uma tabela no banco de dados.
// É usado para criar, ler, atualizar e excluir tarefas.
const Task = require('./models/Task');

// Importa as rotas para tarefas, onde estão definidos os endpoints relacionados a elas.
const taskRoutes = require('../ClickTask/routes/tasksRoutes');

// Adiciona o middleware 'method-override' para permitir o uso de métodos HTTP personalizados via query string '_method'.
// Exemplo: um formulário pode simular um DELETE adicionando '?_method=DELETE' à URL.
app.use(methodOverride('_method'));

// Configura o Express para usar o Handlebars como mecanismo de template, permitindo renderizar páginas dinâmicas com a extensão .handlebars.
app.engine('handlebars', exphbs.engine());

// Adiciona o middleware para processar dados enviados por formulários HTML no formato application/x-www-form-urlencoded.
// O 'extended: true' permite aninhar objetos e arrays nos dados enviados.
app.use(express.urlencoded({ extended: true }));

// Adiciona o middleware para processar requisições com JSON no corpo. Isso é útil para APIs REST.
app.use(express.json());

// Define o mecanismo de visualização padrão como Handlebars, para que o Express saiba como renderizar as views.
app.set('view engine', 'handlebars');

// Configura o diretório 'public' como o local dos arquivos estáticos do projeto (ex.: CSS, imagens, JavaScript do frontend).
// Esses arquivos poderão ser acessados diretamente via navegador.
app.use(express.static('public'));

// Registra as rotas de tarefas no caminho '/tasks'. 
// Todas as requisições que começarem com '/tasks' serão redirecionadas para o arquivo de rotas taskRoutes.
app.use('/tasks', taskRoutes);

// Sincroniza o banco de dados com o Sequelize (ORM usado no projeto). 
// Após a sincronização bem-sucedida, inicia o servidor na porta definida.
conn.sync()
    .then(() => {
        app.listen(port, () => {
            // Mensagem de sucesso exibida no terminal quando o servidor está rodando.
            console.log(`Servidor rodando na porta ${port}`);
        });
    })
    .catch((err) => {
        // Caso ocorra um erro durante a sincronização com o banco de dados, o erro será exibido no terminal.
        console.log(err);
    });
