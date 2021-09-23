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

app.get('/users/login', (req, res) => {
    res.render('users/login')
})

app.get('/users/panel', (req, res) => {
    res.render('users/panel')
})

app.get('/users/panel/flashcards/new', (req, res) => {
    res.render('users/flashcards/new')
})

app.get('/users/panel/notebook/new', (req, res) => {
    res.render('users/notebook/new')
})

app.get('/users/panel/schedule/new', (req, res) => {
    res.render('users/schedule/new')
})

app.get('/admin/panel', (req, res) => {
    res.render('users/admin/panel')
})

app.get('/*', (req, res) => {
    res.render('404')
})

//Iniciando servidor na porta 5050
app.listen(5050, () => {
    console.log('Servidor executando')
})