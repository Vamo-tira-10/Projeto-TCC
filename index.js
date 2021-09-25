//Importando módulo e instanciando o módulo do Express
const express = require('express')
const app = express()

//Importando rotas do usuário
const userController = require('./users/userController')

//Importando rotas do admin
const adminController = require('./users/admin/adminController')

//Configurando Express para utilizar o EJS como template engine (Renderizar HTML dinâmico)
app.set('view engine', 'ejs')

//Configurando Express para usar alguns middlewares:
app.use(express.static('public')) //Middleware de conteúdo estático (CSS, JS)
app.use(express.urlencoded({extended:false})) //Middleware para interpretar o body das requisições (Formulários)
app.use('/', userController) //Middleware para usar as rotas do usuário
app.use('/', adminController) //Middleware para usar as rotas do admin

//Rota principal (Home)
app.get('/', (req, res) => {
    res.render('index')
})

//Rota de erro 404
app.get('/*', (req, res) => {
    res.render('404')
})

//Iniciando servidor na porta 5050
app.listen(5050, () => {
    console.log('Servidor executando')
})