// objetivo: criar uma API para responder dados de estados e cidades.
// Data: 10/11/2023
// autor: Maria Luiza Balieiro 
// versão: 1.0


// intalaçoes das dependencias para criação da API 
//  * epress: npm install express --save (dependencia do node paraauxiliar na criação de API)
//  * cors: npm install cors --save (dependencia para manipular recursos, acessos, permições e etc.. da API)
//  * body-parser: npm install body-parser --save (dependencia para aulixiar na chegada de dados na API)

// metodos:
// get: pega dados 
// post: envia dados 
// put: altera dados existentes 
// delete: apagar dados existentes 

// importa as bibiotecas do projeto
const express = require ('express');
const cors = require ('cors');
const bodyParser = require ('body-parser');
const { request } = require('http');
const { nextTick } = require('process');

// cria um obj app tendo como referencia a classe express
const app = express();

// request: receber dados 
// response: devolve dados 
// função para configurar as permições do cors
app.use((request,response,next)=> {
 
    //  configura quem podera fazer requisições na API (o * libera para todos | IP retringe o acesso)
    response.header('Access-Control-Allow-Origin', '*');
    // configura os metodos que poderão ser uzados na API  get, post, put e delete
    response.header('Access-Control-Allow-Methods', 'GET');

    app.use(cors());

    next();


})



// EndPoints: listar a sigla de todos os estados 
app.get('/estados/sigla', cors(), async function(request, response, next) {

    let controlelistaEstados = require('./modulo/estados_cidades');
    let estados = controlelistaEstados.getListadeEstados();
 response.json('{teste: API funcionando}');
 response.status(200);

});

// Endpoint: retornaos os dados do estado filtrado pela sigla
app.get('/estado/sigla/:uf' ,cors(), async function(request, response, next){
    // Recebe uma variavel encaminhada por pareamento na URL da requisição
    let siglaEstado = request.params.uf;
    
    // importe de arquivos e funções
    let controledadosEstado = require('./modulo/estados_cidades.js');
    let dadosEstado = controleDadosEstado.getDadosEstado(siglaEstado);

    if (dadosEstado){

    response.json(dadosEstado);
    response.status(200); }
    else{
        response.json('{erro: Não foi possível encontrar um item}');
        response.status(404)
    }
})



// endpoint: retorna os dados da capital filtrando pela sigla 
app.get('/capital/estado' ,cors(), async function(request, response, next){
//    recebe parametros via query , que são variaveis encaminhadas na URL da requição (?uf=SP)
    let siglaEstado = request.query.uf;
    let controleDadosCapital = require ('./modulo/estados_cidades.js');
    let dadosCapital = controleDadosCapital.getCapitalEstados(siglaEstado);
    if(dadosCapital){
        response.json(dadosCapital);
        response.status(200);

    } else{
        response.status(404)
        response.json({erro: 'Não foi possível encontrar um item'})
    }
})








// executa a API e faz ela ficar aguardando requisições 
app.listen(8080, function(){
 console.log('API funcionando e aguardando requisições')
})





