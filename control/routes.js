// Carrega o módulo "express.js".
const express = require('express');

// Cria um roteamento "Express".
const router = express.Router();

// Extrai os dados do cabeçalho da requisição usando "JSON".
const bodyParser = require('body-parser').json();

// Rota raiz emite mensagem de erro.
router.get("/", (req, res) => {
    res.json({
        status: "error",
        message: "Bad request"
    });
});

// Carrega o controller de 'obras'.
const obrasControl = require('./obrasControl');
// Rotas para as requisições de 'obras'.
router.get("/obras/", obrasControl.getAll);
router.get("/obras/:id", obrasControl.getOne);
router.get("/obras/artista/:id", obrasControl.getAllArtist);
router.get("/obras/museu/:id", obrasControl.getAllArtist);
router.post("/obras/", bodyParser, obrasControl.post);
router.put("/obras/:id", bodyParser, obrasControl.put);
router.delete("/obras/:id", obrasControl.delete);


// Carrega o controller de 'artistas'.
const artistasControl = require('./artistasControl');
// Rotas para as requisições de 'artistas'.
router.get("/artistas/", artistasControl.getAll);
router.get("/artistas/:id", artistasControl.getOne);
router.post("/artistas/", bodyParser, artistasControl.post);
router.put("/artistas/:id", bodyParser, artistasControl.put);
router.delete("/artistas/:id", obrasControl.delete);


// Carrega o controller de 'museus'.
const museusControl = require('./museusControl');
// Rotas para as requisições de 'museus'.
router.get("/museus/", museusControl.getAll);
router.get("/museus/:id", museusControl.getOne);


// Carrega o controller de 'admin'.
const adminControl = require('./adminControl');
// Rotas para as requisições de 'admin'.
router.get("/admin/:id", adminControl.getOne);
router.post("/login/", bodyParser, adminControl.post);


// Exporta o módulo.
module.exports = router;

