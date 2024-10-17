// Declarando um Object

const obj1 = { // forma convencional de declarar um objeto
    nome: 'Cebolinha'
}

const obj2 = new Object() // forma semântica de declarar um objeto
obj2.nome = 'Magali'; // atribuindo valor da propiedade "nome" do obj2
obj2["idade"] = 28 //adicionando uma propriedade já com o valor ao obj2

console.log(obj1)
console.log(obj2)


const data1 = Date() 
console.log(data1);
console.log(typeof(data1));

const data2 = new Date()
console.log(data2)
console.log(typeof(data2))