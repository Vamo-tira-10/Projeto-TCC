//Importando módulo e instanciando o Express
const express = require('express')
const session = require('express-session')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const app = express()
const server = require('http').createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

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

//Importando rotas de Flash Card
const flashCardController = require('./controllers/flashCardController')

//Importando rotas do Caderno Virtual
const notebookController = require('./controllers/notebookController')

//Importando rotas da Agenda
const scheduleController = require('./controllers/scheduleController')

const connection = require('./database/connection')

connection.authenticate().then(() => {
    console.log('Conectado ao banco com sucesso!')
}).catch(err => {
    console.log(err)
})

//Importando model de Usuário
const User = require('./models/User')

//Importando model de Flash Card
const FlashCard = require('./models/FlashCard')

//Importando model de Caderno Virtual
const Notebook = require('./models/Notebook')

//Importando model da Agenda
const Schedule = require('./models/Schedule')

//Configurando Express para utilizar o EJS como template engine (Renderizar HTML dinâmico)
app.set('view engine', 'ejs')

//Configurando Express para usar alguns middlewares:
app.use(cookieParser('asjdoasjdasjo'))
app.use(session({
    secret: 'asjodjaso',
    resave: false,
    saveUninitialized: true,
    rolling: true,
    cookie: {
        maxAge: 3600000
    }
}))
app.use(flash())
app.use(express.static('public')) //Middleware de conteúdo estático (CSS, JS)
app.use(express.urlencoded({ extended: false })) //Middleware para interpretar o body das requisições (Formulários)
app.use('/users', userController) //Middleware para usar as rotas do usuário
app.use('/admin', adminController) //Middleware para usar as rotas do admin
app.use('/users/panel/flashcards', flashCardController) //Middleware para usar as rotas de Flash Card
app.use('/users/panel/notebooks', notebookController) //Middleware para usar as rotas de Flash Card
app.use('/users/panel/schedules', scheduleController) //Middleware para usar as rotas de Flash Card
app.use('/favicon.ico', express.static('public/img/favicon.ico'))

//Rota principal (Home)
app.get('/', (req, res) => {
    if (req.session.user == undefined) {
        let success = req.flash('success')
        success = (success == undefined || success.length == 0) ? undefined : success
        res.render('index', { success })
    }
    else {
        if (req.session.user.adm == 1) {
            res.redirect('/admin/panel')
        }
        else {
            res.redirect('/users/panel')
        }
    }
})

//Rota de erro 404
app.get('/*', (req, res) => {
    res.render('404')
})

//Iniciando servidor na porta 5050
server.listen(5050, () => {
    console.log('Servidor executando')
    console.log('http://localhost:5050')
})