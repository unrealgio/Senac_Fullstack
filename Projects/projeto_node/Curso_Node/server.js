/* 

const http = require("http")

const port = 3333


const server = http.createServer((req, res)=>{  
    
    
     função com dois paramêtros, "request" e "response". O request serve para obter dados da requisição do usuário para o meu servidor http. Traz informações da requisições que estão sendo feitas dentro do meu servidor. O "response" é o objeto que se utiliza para responder à essa requisição. Enquanto uma requisição não obter resposta, o server não continua a rodar, levando à erros.


    console.log('oi')

   return res.end() // retorna a resposta ao usuario, finalizando a requisição.
})


server.listen(port, ()=>{
    console.log("server rodando daquele modelinho")
})

*/

// USANDO VERSÃO ATUALIZADA DO ECMASCRIPT E FASTIFY



import { fastify } from "fastify";

import { databaseMemory } from "./database-memory.js"

const database = new databaseMemory()

const server = fastify()

// localhost:3333/videos
server.post('/videos' , (request, response) =>{  

    const {title, description, duration} = request.body

    database.create({ // usando "short sintaxe" para criar um objeto novo na minha database memory
        title,
        description,
        duration
    })

    console.log(database.list()) // mostra os videos guardados no meu map externo

    return response.status(201).send() // retornando a resposta à requisição do usuário, usando o status 201 que significa que algo foi criado.
})

// localhost:3333/videos
server.get('/videos' , () =>{ 
    console.log('você está agora na rota /videos')

    const videos = database.list()

    return videos
})

// localhost:3333/videos/3502
server.put('/videos/:id' , (request, response) =>{  // usando metodo put para "upar" os videos no meu servidor, usando o route parameter ID. Significa que a rota agora entende que preciso fornecer um ID ao visitar a rota especifica.

    console.log('World')

    const videoID = request.params.id

    const {title, description, duration} = request.body

    database.update(videoID , {
        title,
        description,
        duration,
        
    })

    return response.status(204).send()
})

// localhost:3333/videos
server.delete('/videos/:id' , (request, response) =>{  // usando metodo delete para deleter os videos no meu servidor, usando o route parameter ID. Significa que a rota agora entende que preciso fornecer um ID ao visitar a rota especifica.

    const videoID = request.params.id

    database.delete(videoID)

    return response.status(204).send()

    console.log('World')
})

server.listen({ 

    port: 3333,
})


