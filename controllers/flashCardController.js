const express = require('express')
const router = express.Router()

//Importando middleware de verificação se o usuário está autenticado no sistema
const userAuth = require('../middlewares/userAuth')

//Importando model de Flash Card
const FlashCard = require('../models/FlashCard')

//Rota para a página principal de Flash Cards
router.get('/', userAuth, (req, res) => {
    req.session.lastRoute = req.originalUrl
    FlashCard.findAll({
        order: [
            ['id', 'DESC']
        ],
        where: {
            userId: req.session.user.id
        }
    }).then(flashcards => {
        let adm = false
        if (req.session.user.adm) {
            adm = true
        }
        let success = req.flash('success')
        success = (success == undefined || success.length == 0) ? undefined : success
        res.render('users/flashcards/index', { userName: req.session.user.name, flashcards, adm, success })
    }).catch(err => {
        console.log(err)
    })
})

//Rota para cadastro de novo Flash Card
router.post('/save', (req, res) => {
    const { question, answer } = req.body
    FlashCard.create({
        question: question,
        answer: answer,
        userId: req.session.user.id
    }).then(() => {
        req.flash('success', 'Flash Card cadastrado com sucesso!')
        res.redirect('/users/panel/flashcards/')
    }).catch(err => {
        console.log(err)
    })
})

//Rota de edição de Flash Card
router.post('/edit/:id', (req, res) => {
    const { question, answer } = req.body
    FlashCard.update({
        question: question,
        answer: answer
    },
    {
        where: {
            id: req.params.id
        }
    }).then(() => {
        req.flash('success', 'Flash Card editado com sucesso!')
        res.redirect('/users/panel/flashcards/')
    }).catch(err => {
        console.log(err)
    })
})

//Rota para excluir Flash Card
router.post('/delete/:id', (req, res) => {
    FlashCard.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        req.flash('success', 'Flash Card excluído com sucesso!')
        res.redirect('/users/panel/flashcards/')
    }).catch(err => {
        console.log(err)
    })
})

module.exports = router