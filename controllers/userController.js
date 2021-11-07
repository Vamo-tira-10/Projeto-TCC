//Importando módulo e instanciando o módulo de rotas do Express
const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')

const User = require('../models/User')
const userAuth = require('../middlewares/userAuth')

//Rota de cadastro de usuários
router.get('/users/new', (req, res) => {
    if (req.session.user == undefined) {
        res.render('users/new')
    }
    else {
        res.redirect(req.session.lastRoute)
    }
})

//Rota de login de usuários
router.get('/users/login', (req, res) => {
    if (req.session.user == undefined) {
        req.session.lastRoute = '/users/login'
        let error = req.flash('error')
        error = (error == undefined || error.length == 0) ? undefined : error
        res.render('users/login', { error })
    }
    else {
        res.redirect(req.session.lastRoute)
    }
})

//Rota de painel do usuário
router.get('/users/panel', userAuth, (req, res) => {
    req.session.lastRoute = '/users/panel'
    res.render('users/panel', { userName: req.session.user.name })
})

router.get('/users/logout', (req, res) => {
    req.session.lastRoute = '/users/logout'
    req.session.user = undefined
    res.redirect('/')
})

//Rota de Flash Cards do usuário
router.get('/users/panel/flashcards/new', userAuth, (req, res) => {
    req.session.lastRoute = '/users/panel/flashcards/new'
    res.render('users/flashcards/new', { userName: req.session.user.name })
})

//Rota de Caderno Virtual do usuário
router.get('/users/panel/notebook/new', userAuth, (req, res) => {
    req.session.lastRoute = '/users/panel/notebook/new'
    res.render('users/notebook/new', { userName: req.session.user.name })
})

//Rota de Agenda do usuário
router.get('/users/panel/schedule/new', userAuth, (req, res) => {
    req.session.lastRoute = '/users/panel/schedule/new'
    res.render('users/schedule/new', { userName: req.session.user.name })
})

router.post('/users/save', (req, res) => {
    const { name, email, password } = req.body
    const passwordHashed = bcrypt.hashSync(password, 10)
    User.create({
        name: name,
        email: email,
        password: passwordHashed,
        adm: 0
    }).then(() => {
        req.flash('success', 'Usuário cadastrado com sucesso!')
        res.redirect('/')
    }).catch(err => {
        console.log(err)
    })
})

router.post('/users/auth', (req, res) => {
    const { email, password } = req.body
    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if (user != undefined) {
            if (bcrypt.compareSync(password, user.password)) {
                const userAuth = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
                req.session.user = userAuth
                res.redirect('/users/panel')
            }
            else {
                req.flash('error', 'E-mail ou senha inválidos!')
                res.redirect('/users/login')
            }
        }
        else {
            req.flash('error', 'E-mail ou senha inválidos!')
            res.redirect('/users/login')
        }
    }).catch(err => {
        console.log(err)
    })
})

//Importando rotas do usuário
module.exports = router