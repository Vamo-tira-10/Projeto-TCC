//Importando e instanciando o módulo de rotas do Express
const express = require('express')
const router = express.Router()

//Importando biblioteca para fazer o hash de senhas do usuário
const bcrypt = require('bcryptjs')

//Importando model de usuário
const User = require('../models/User')

//Importando model de Flash Cards
const FlashCard = require('../models/FlashCard')

//Importando model de Caderno Virtual
const Notebook = require('../models/Notebook')

//Importando model de Agenda
const Schedule = require('../models/Schedule')

//Importando middleware de verificação se o usuário está autenticado no sistema
const userAuth = require('../middlewares/userAuth')

//Rota de cadastro de usuários
router.get('/new', (req, res) => {
    if (req.session.user == undefined) {
        let error = req.flash('error')
        error = (error == undefined || error.length == 0) ? undefined : error
        res.render('users/new', { error })
    }
    else {
        res.redirect(req.session.lastRoute)
    }
})

//Rota de login de usuários
router.get('/login', (req, res) => {
    if (req.session.user == undefined) {
        req.session.lastRoute = req.originalUrl
        let error = req.flash('error')
        error = (error == undefined || error.length == 0) ? undefined : error
        res.render('users/login', { error })
    }
    else {
        res.redirect(req.session.lastRoute)
    }
})

//Rota de painel do usuário
router.get('/panel', userAuth, (req, res) => {
    req.session.lastRoute = req.originalUrl
    FlashCard.count({
        where: {
            userId: req.session.user.id
        }
    }).then(flashcardsCount => {
        Notebook.count({
            where: {
                userId: req.session.user.id
            }
        }).then(notebooksCount => {
            Schedule.count({
                where: {
                    userId: req.session.user.id
                }
            }).then(schedulesCount => {
                res.render('users/panel', { userName: req.session.user.name, flashcardsCount, notebooksCount, schedulesCount })
            })
        })
    })
})

router.get('/logout', (req, res) => {
    req.session.lastRoute = req.originalUrl
    req.session.user = undefined
    res.redirect('/')
})

//Rota para receber os dados do formulário de cadastro de novo usuário
router.post('/save', (req, res) => {
    const { name, email, password } = req.body
    const passwordHashed = bcrypt.hashSync(password, 10)
    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if (user == undefined) {
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
        }
        else {
            req.flash('error', 'E-mail já cadastrado!')
            res.redirect('/users/new')
        }
    }).catch(err => {
        console.log(err)
    })
})

router.post('/delete/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        req.flash('success', 'Usuário excluído com sucesso!')
        res.redirect('/admin/panel')
    }).catch(err => {
        console.log(err)
    })
})

//Rota para receber os dados do formulário de login de usuário
router.post('/auth', (req, res) => {
    const { email, password } = req.body
    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if (user != undefined) {
            if (bcrypt.compareSync(password, user.password)) {
                const userAuthenticated = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    adm: user.adm
                }
                req.session.user = userAuthenticated
                if (user.adm != 1) {
                    res.redirect('/users/panel')
                }
                else {
                    res.redirect('/admin/panel')
                }
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