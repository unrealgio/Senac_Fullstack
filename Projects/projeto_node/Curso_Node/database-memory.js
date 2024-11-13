
import { randomUUID } from "node:crypto" // importando o metodo random UUID do modulo node crypto

export class databaseMemory { // criando classe para exportar funções para outro arquivo js


    #videos = new Map() // criando chave privada do banco de dados de memoria usando estrutura de dados map


    list(){
        return  Array.from(this.#videos.entries()).map((videoArray) =>{ // converte uma estrutura de dados que não é um array, para um array.
// Entries serve para transformar um array em vários arrays, para que assim, o ID dos meus videos sejam listado junto das demais informações, e não separado

            const id = videoArray[0] 
            const data = videoArray[1]

            return {

                id,

                ...data,
            }
        }) 
    }
    create(video) { // metodo para receber os vídeos e salva-los dentro do map '#videos'

        const videoID = randomUUID(); // UNIQUE UNIVERSAL ID

        this.#videos.set(videoID, video) //usando o metodo 'set' da estrutura de dados 'map' para adicionar propriedades dentro do map

    }

    update(id, video){

        this.#videos.set(id, video)
    }

    delete(id){

        this.#videos.delete(id)
    }
}