// Importa o módulo 'express', usado para criar e gerenciar rotas e middlewares no servidor.
const express = require('express');

// Cria um roteador usando o método Router do Express.
// Esse roteador será responsável por definir as rotas relacionadas às tarefas.
const router = express.Router();

// Importa o controlador 'TaskController', que contém a lógica de cada rota.
// Este controlador gerencia as operações com tarefas, como criar, editar ou listar.
const TaskController = require('../controllers/TaskController');

// Define uma rota GET para '/home', que renderiza a página principal com as tarefas.
// A lógica da rota é implementada no método 'homeTasks' do TaskController.
router.get('/home', TaskController.homeTasks);

// Define uma rota GET para '/add', que renderiza o formulário para criar uma nova tarefa.
// A lógica da rota é implementada no método 'createTask' do TaskController.
router.get('/add', TaskController.createTask);

// Define uma rota GET para '/', que exibe todas as tarefas cadastradas.
// A lógica da rota é implementada no método 'showTasks' do TaskController.
router.get('/', TaskController.showTasks);

// Define uma rota GET para '/edit/:id', que renderiza o formulário de edição para uma tarefa específica.
// ':id' é um parâmetro dinâmico que representa o ID da tarefa a ser editada.
// A lógica da rota é implementada no método 'updateTask' do TaskController.
router.get('/edit/:id', TaskController.updateTask);

// Define uma rota POST para '/add', que recebe os dados do formulário de criação de tarefa e os salva no banco.
// A lógica da rota é implementada no método 'createTaskSave' do TaskController.
router.post('/add', TaskController.createTaskSave);

// Define uma rota POST para '/edit', que recebe os dados do formulário de edição e atualiza a tarefa no banco.
// A lógica da rota é implementada no método 'updateTaskPost' do TaskController.
router.post('/edit', TaskController.updateTaskPost);

// Define uma rota POST para '/updatestatus', que alterna o status de conclusão de uma tarefa (concluída/não concluída).
// A lógica da rota é implementada no método 'toggleTaskStatus' do TaskController.
router.post('/updatestatus', TaskController.toggleTaskStatus);

// Define uma rota POST para '/remove', que recebe o ID da tarefa a ser removida e a deleta do banco.
// A lógica da rota é implementada no método 'removeTask' do TaskController.
router.post('/remove', TaskController.removeTask);

// Exporta o roteador para que ele possa ser usado no arquivo principal do servidor (app.js).
module.exports = router;
