const express = require('express');
const app = express();

const port = 3000;

app.use(express.json());

const games = [
    'Ragnarok',
    'Perfect World',
    'Pokemon Go',
    'GTA SanAndreas',
    'GTA Vice City',
    'Conter Strike 1.5',
];

function rangame(num) {
    return gameAleatrio[num];
};

const mensagemHome = [
    'Seja bem-vindo ao site Lista de Games',
    'Oi! Na próxima rota você vai encontrar a lista de jogos.',
    'Eita chegou no meu site! =)',
];

function mensagem(num){
    return mensagemHome[num];
};

function random(min, max){
    return Math.floor(Math.random() * (max - min)) +min;
};

//---------------------- GET ---------------//

app.get('/', (req, res) =>{
    res.send(`${mensagem(random(0,mensagemHome.length))}`);

});

app.get('/games', (req, res) =>{
    res.send(games);
});

app.get('/games/Aleatorio', (req, res) =>{
    res.send(`<h1>${rangeme(random(0,rangame.length))}</h1>`);
});

app.get('/games/:id', (req, res) =>{
    const id = req.params.id -1;
    const game = games[id];
    if (id > games.length -1 || id< 0){
        res.send(`O ID do game é inexistente, tente escolher um ID entre 1 e ${games.length}`);
    }
    res.send(game);
});

//--------------------- POST ----------------------//

app.post('/games', (req, res) =>{
    const game = req.body.games;
    const id = games.length +1;
    games.push(game);
    res.send(`O game ${game} foi adicionado com sucesso, seu ID é ${id}`);
}),

//--------------------- PUT ------------------------//

app.put('/games/:id', (req,res) =>{
    const id = req.params.id -1;
    const game = req.body.game;
    if(!game){
        res.send('O game que você procura não esta na nossa lista.');
    }
    const gameAnterior = games[id];
    games[id] = game;
    res.send(`O game ${gameAnterior} foi atualizado para ${game}, com sucesso.`);
});

//---------------------- DELETE -----------------------//

app.delete('/games/:id', (req, res) =>{
    const id = req.params.id -1;
    const game = games[id];
    if(!game){
        res.send('Esse filme não esta na nossa lista.')
    }
    delete games[id];
    res.send('Deletado!');
});

app.listen(port, function(){
    console.log(`http://localhost:${port}`);
});