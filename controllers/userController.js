//Importando módulo e instanciando o módulo de rotas do Express
const express = require('express')
const router = express.Router()

const redirecionaHttps = require('../middlewares/redirecionaHttps')

//Rota de cadastro de usuários
router.get('/users/new', redirecionaHttps, (req, res) => {
    res.render('users/new')
})

//Rota de login de usuários
router.get('/users/login', redirecionaHttps, (req, res) => {
    res.render('users/login')
})

//Rota de painel do usuário
router.get('/users/panel', redirecionaHttps, (req, res) => {
    res.render('users/panel')
})

//Rota de Flash Cards do usuário
router.get('/users/panel/flashcards/new', redirecionaHttps, (req, res) => {
    res.render('users/flashcards/new')
})

//Rota de Caderno Virtual do usuário
router.get('/users/panel/notebook/new', redirecionaHttps, (req, res) => {
    res.render('users/notebook/new')
})

//Rota de Agenda do usuário
router.get('/users/panel/schedule/new', redirecionaHttps, (req, res) => {
    res.render('users/schedule/new')
})

//Importando rotas do usuário
module.exports = router