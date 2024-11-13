// Importa o módulo 'meuModulo' localizado no mesmo diretório do arquivo atual.
// Dentro de "meuMódulo.js" tem um objeto que contém a função 'soma'

const meuModulo = require("./meuModulo")

const soma = meuModulo.soma // atribuindo a função soma do meu arquivo externo 'meuModulo' para a variável 'soma'

// Chama a função 'soma' com os parametros 2 e 3
soma(2, 3)

// Chama a função 'soma' usando os parametros 10 e 3.
soma(10, 3)
