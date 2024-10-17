// Factory functions / Construtor Functions / Classes

function criaPessoa(nome, sobrenome){ //criando função "criaPessoa" com dois parâmetros iniciais.
    return {
        nome,
        sobrenome,
        get nomeCompleto(){ // usando o metodo get para obter o objeto "nomeCompleto"
            return `${this.nome} ${this.sobrenome}`; // aqui a função retorna um objeto que contem 3 propriedades: 2 parametros (nome, sobrenome) e 1 getter que retorna o nome completo da pessoa (uma combinação de nome e sobrenome)
        }
    };
}

const p1 = criaPessoa('Douglas', 'Silva')
console.log(p1.nomeCompleto)

// ----------------------------------------------

console.clear()

function Pessoa(nome, sobrenome){ // Essa função funciona como um "molde" para criar novos objetos "Pessoa". Ela aceita dois parâmetros, nome e sobrenome, e atribui esses valores às propriedades this.nome e this.sobrenome do objeto que está sendo criado. 
    this.nome = nome; 
    this.sobrenome = sobrenome;

    //************ IMPORTANTE: O "this" dentro da função construtora refere-se ao novo objeto que será criado quando a função for chamada com a palavra-chave new. Ele cria propriedades no novo objeto com os valores fornecidos. **********
}

const p2 = new Pessoa ('Giovanni', 'Oliveira'); //criando novo objeto Pessoa com os parâmetros já inseridos
console.log(p2)