/* Atividade 1: CRUD de Produto

Descrição:  
Crie uma classe chamada Produto com os seguintes atributos privados: id, nome, preco. Implemente os métodos necessários para realizar as operações CRUD (Create, Read, Update, Delete) em um sistema de produtos. 

- Métodos:
  - adicionarProduto(produto): Adiciona um novo produto.
  - listarProdutos(): Retorna todos os produtos cadastrados.
  - atualizarProduto(id, novoProduto): Atualiza os dados de um produto existente.
  - removerProduto(id): Remove um produto pelo id. */

  // -------------------------------###----------------------------------


class Produto {
    constructor(id, nome, preco) {
      this._id = id;      // Atributo privado usando convenção com '_'
      this._nome = nome;
      this._preco = preco;
    }
  
    // getters
    get id() {
      return this._id;
    }
  
    get nome() {
      return this._nome;
    }
  
    get preco() {
      return this._preco;
    }
  
    // setters
    set nome(novoNome) {
      this._nome = novoNome;
    }
  
    set preco(novoPreco) {
      this._preco = novoPreco;
    }
  }
  
  // gerenciando os produtos
  class SistemaProdutos {
    constructor() {
      this.produtos = [];
    }
  
    // Adiciona um novo produto
    adicionarProduto(produto) {
      this.produtos.push(produto);
    }
  
    // Retorna todos os produtos cadastrados
    listarProdutos() {
      return this.produtos;
    }
  
    // atualizando um produto pelo id
    atualizarProduto(id, novoProduto) {
      const produto = this.produtos.find(prod => prod.id === id);
      if (produto) {
        produto.nome = novoProduto.nome;
        produto.preco = novoProduto.preco;
      } else {
        console.log(`Produto com id ${id} não encontrado.`);
      }
    }
  
    // removendo um produto pelo id
    removerProduto(id) {
      this.produtos = this.produtos.filter(prod => prod.id !== id);
    }
  }
  
  const sistema = new SistemaProdutos();
  
  // Create
  sistema.adicionarProduto(new Produto(1, 'Teclado', 100));
  sistema.adicionarProduto(new Produto(2, 'Mouse', 50));
  
  // Read
  console.log('Produtos cadastrados:', sistema.listarProdutos());
  
  // Update
  sistema.atualizarProduto(1, new Produto(1, 'Teclado Mecânico', 150));
  console.log('Produtos após atualização:', sistema.listarProdutos());
  
  // Delete
  sistema.removerProduto(2);
  console.log('Produtos após remoção:', sistema.listarProdutos());
  