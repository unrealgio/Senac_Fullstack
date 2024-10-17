// Exemplos básicos de laço de repetição for
// Geralmente com iteráveis (array ou strings)
//i significa index
for (let i = 0; i <=5; i++) {
    console.log(i);
}

console.clear();

for (let i = 400; i <=500; i += 10) {
    console.log(i);
}
console.clear();

for (let i = -100; i <=500; i += 10) {
    console.log(i);
}

console.clear();


for (let i = 500; i >= 400; i -= 10) {
    console.log(i);
}

console.clear();


for (let i = 0; i <= 10; i++)    {
    const par = i % 2 === 0;
    console.log( i , par)
}               

console.clear()

const frutas = ['Maçã', 'Pera', 'Uva', 'Banana', 'Morango', 'Goiaba', 'Abacate'];

for (let i = 0; i <frutas.length; i++){
    console.log(`Índice ${i}`, frutas[i])
}