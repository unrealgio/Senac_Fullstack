// Objeto pessoa
const pessoa = { // criando o objeto "pessoa"
    nome: "Gio", 
    idade: 25,
    endereco: { //adicionando um objeto filho "endereco" dentro do objeto pai "pessoa"
      rua: "Antonio Basílio", 
      numero: 403, 
      cidade: "Natal", 
      estado: "RN" 
    }
  };
  
  // Acessando propriedades do objeto pai "pessoa"
  console.log(pessoa.nome);         // Exibe "Gio"
  console.log(pessoa.idade);        // Exibe 25
  
  // Acessando propriedades do objeto filho "endereco"
  console.log(pessoa.endereco.rua);     // Exibe "Antonio Basílio"
  console.log(pessoa.endereco.cidade);  // Exibe "Natal"
  