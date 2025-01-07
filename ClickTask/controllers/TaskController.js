// Importa o modelo 'Task', que representa a tabela de tarefas no banco de dados.
// Esse modelo é usado para interagir com o banco de dados: criar, buscar, atualizar e excluir tarefas.
const Task = require('../models/Task');

// Exporta a classe 'TaskController', que contém métodos estáticos para gerenciar tarefas.
// Cada método representa uma ação que pode ser executada em resposta a uma rota específica.
module.exports = class TaskController {

    // Renderiza o formulário para criar uma nova tarefa.
    static createTask(req, res) {
        res.render('tasks/create'); // Renderiza a view 'create' na pasta 'tasks'.
    }

    // Busca todas as tarefas no banco de dados e renderiza uma lista com elas.
    static showTasks(req, res) {
        Task.findAll({ raw: true }) // Busca todas as tarefas no banco de dados, retornando apenas os dados brutos.
            .then((data) => {
                res.render('tasks/all', { tasks: data }); // Renderiza a view 'all' passando as tarefas como contexto.
            })
            .catch((err) => console.log(err)); // Exibe o erro caso a busca falhe.
    }

    // Renderiza a página inicial das tarefas.
    static homeTasks(req, res) {

        
        res.render('tasks/home') // Renderiza a view 'home' na pasta 'tasks'.
    }

    // Salva uma nova tarefa no banco de dados e redireciona para a lista de tarefas.
    static async createTaskSave(req, res) {
        // Cria um objeto com os dados enviados pelo formulário.
        const task = {
            title: req.body.title, // Título da tarefa.
            description: req.body.description, // Descrição da tarefa.
            done: false, // Define que a tarefa está pendente por padrão.
        };

        await Task.create(task); // Insere a nova tarefa no banco de dados.

        res.redirect('/tasks'); // Redireciona para a lista de tarefas.
    }

    // Remove uma tarefa do banco de dados pelo ID.
    static removeTask(req, res) {
        const id = req.body.id; // Obtém o ID da tarefa enviado no corpo da requisição.

        Task.destroy({ where: { id: id } }) // Remove a tarefa com o ID especificado.
            .then(res.redirect('/tasks')) // Redireciona para a lista de tarefas após a exclusão.
            .catch((err) => console.log(`Erro ao remover tarefa: ${err}`)); // Exibe o erro caso a exclusão falhe.
    }

    // Renderiza o formulário de edição de uma tarefa específica.
    static updateTask(req, res) {
        const id = req.params.id; // Obtém o ID da tarefa da URL (parâmetro de rota).

        Task.findOne({ where: { id: id }, raw: true }) // Busca a tarefa pelo ID no banco de dados.
            .then((data) => {
                res.render('tasks/edit', { task: data }); // Renderiza a view 'edit' passando os dados da tarefa como contexto.
            })
            .catch((err) => console.log(`Erro ao buscar tarefa para edição: ${err}`)); // Exibe o erro caso a busca falhe.
    }

    // Atualiza os dados de uma tarefa no banco de dados.
    static updateTaskPost(req, res) {
        const id = req.body.id; // Obtém o ID da tarefa enviado no corpo da requisição.

        // Cria um objeto com os novos dados da tarefa.
        const task = {
            title: req.body.title, // Novo título.
            description: req.body.description, // Nova descrição.
        };

        Task.update(task, { where: { id: id } }) // Atualiza os dados da tarefa no banco de dados.
            .then(res.redirect('/tasks')) // Redireciona para a lista de tarefas após a atualização.
            .catch((err) => console.log(`Erro ao atualizar tarefa: ${err}`)); // Exibe o erro caso a atualização falhe.
    }

    // Alterna o status de uma tarefa (concluída ou pendente).
    static toggleTaskStatus(req, res) {
        const id = req.body.id; // Obtém o ID da tarefa enviado no corpo da requisição.

        // Determina o novo status com base no valor enviado.
        const task = {
            done: req.body.done === '0' ? true : false, // Se o status atual for '0' (pendente), muda para 'true' (concluído).
        };

        Task.update(task, { where: { id: id } }) // Atualiza o status da tarefa no banco de dados.
            .then(res.redirect('/tasks')) // Redireciona para a lista de tarefas após a atualização.
            .catch((err) => console.log(`Erro ao alternar status da tarefa: ${err}`)); // Exibe o erro caso a atualização falhe.
    }
};
