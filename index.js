//Importando módulo de file system (manipulação de arquivos)
const fs = require('fs')

//Capturando informações do certificado
const privateKey = fs.readFileSync('/etc/letsencrypt/live/estudy-tcc.com.br/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/estudy-tcc.com.br/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/estudy-tcc.com.br/chain.pem', 'utf8');

//Criando objeto da credencial
const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

//Importando módulo e instanciando o Express
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const https = require('https').createServer(credentials, app);
const { Server } = require('socket.io')
const io = new Server(https)
let contador = 0

io.on('connection', (socket) => {
    io.emit('atualizaContador', { contador: contador })
    socket.on('quemsou', (data) => {
        if (data.id == 'usuario') {
            contador++
            io.emit('atualizaContador', { contador: contador })
            socket.on('disconnect', () => {
                contador--
                io.emit('atualizaContador', { contador: contador })
            })
        }
    })
})

//Importando rotas do usuário
const userController = require('./controllers/userController')

//Importando rotas do admin
const adminController = require('./controllers/adminController')

//Importando middleware de redirecionamento https
const redirecionaHttps = require('./middlewares/redirecionaHttps')

//Configurando Express para utilizar o EJS como template engine (Renderizar HTML dinâmico)
app.set('view engine', 'ejs')

//Configurando Express para usar alguns middlewares:
app.use(express.static('public')) //Middleware de conteúdo estático (CSS, JS)
app.use(express.urlencoded({ extended: false })) //Middleware para interpretar o body das requisições (Formulários)
app.use('/', userController) //Middleware para usar as rotas do usuário
app.use('/', adminController) //Middleware para usar as rotas do admin

//Rota principal (Home)
app.get('/', redirecionaHttps, (req, res) => {
    res.render('index')
})

//Rota de erro 404
app.get('/*', redirecionaHttps, (req, res) => {
    res.render('404')
})

//Iniciando servidor na porta 80 (caso usuário entre sem o protocolo https)
server.listen(80, () => {
})

//Iniciando servidor na porta 443 (com o protocolo https)
https.listen(443, () => {
    console.log('sajodsjao')
})