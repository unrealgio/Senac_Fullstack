// exportando um objeto e colocando ele em um arquivo js separado, o que torna este objeto módulo reutilizável em outros arquivos.
module.exports = { 
    
    soma(a, b) { // criando a função soma//
        
        console.log(a + b) // exibindo no console o resultado do parâmetro 'a' + o parâmetro 'b'
    }
}
