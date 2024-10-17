const pessoa = { //declarando um objeto "pessoa"
    nome: 'Cebolinha', // com a propriedade cebolinha
    sobrenome: 'LinguaPresa' // com a propriedade sobrenome
};

// console.log(pessoa.nome)
// console.log(pessoa.sobrenome)


// também é possível criar objeto com estrutura construtora 

const pessoa1 = new Object();
pessoa1.nome = 'Gio';
pessoa1.sobrenome = 'Oliveira'
pessoa1.idade = 25;

//delete pessoa1.nome; // é possivel usar o "delete" para deletar uma propriedade do objeto.

// Objetos podem conter métodos, métodos são funções!

pessoa1.falarNome = function () { // declarando a função "falarNome"
    return this.nome + "está falando seu nome."
}

pessoa1.falarNome(); // chamando a função 
