//Importando módulo e instanciando o módulo do Express
const express = require('express')
const app = express()

//Configurando Express para utilizar o EJS como template engine (Renderizar HTML dinâmico)
app.set('view engine', 'ejs')

//Configurando Express para usar alguns middlewares:
app.use(express.static('public')) //Middleware de conteúdo estático (CSS, JS)
app.use(express.urlencoded({extended:false})) //Middleware para interpretar o body das requisições (Formulários)

//Rota principal (Home)
app.get('/', (req, res) => {
    res.render('index')
})

//Rota de cadastro de usuários
app.get('/users/new', (req, res) => {
    res.render('users/new')
})

//Rota de login de usuários
app.get('/users/login', (req, res) => {
    res.render('users/login')
})

//Rota de painel do usuário
app.get('/users/panel', (req, res) => {
    res.render('users/panel')
})

//Rota de Flash Cards do usuário
app.get('/users/panel/flashcards/new', (req, res) => {
    res.render('users/flashcards/new')
})

//Rota de Caderno Virtual do usuário
app.get('/users/panel/notebook/new', (req, res) => {
    res.render('users/notebook/new')
})

//Rota de Agenda do usuário
app.get('/users/panel/schedule/new', (req, res) => {
    res.render('users/schedule/new')
})

//Rota de painel do admin
app.get('/admin/panel', (req, res) => {
    res.render('users/admin/panel')
})

//Rota de erro 404
app.get('/*', (req, res) => {
    res.render('404')
})

//Iniciando servidor na porta 5050
app.listen(5050, () => {
    console.log('Servidor executando')
})