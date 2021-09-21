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

//Iniciando servidor na porta 5050
app.listen(5050, () => {
    console.log('Servidor executando')
})