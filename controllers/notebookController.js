const express = require('express')
const router = express.Router()

//Importando middleware de verificação se o usuário está autenticado no sistema
const userAuth = require('../middlewares/userAuth')

//Importando model de Caderno Virtual
const Notebook = require('../models/Notebook')

//Rota para a página principal de Caderno Virtual
router.get('/', userAuth, (req, res) => {
    req.session.lastRoute = req.originalUrl
    Notebook.findAll({
        order: [
            ['id', 'DESC']
        ],
        where: {
            userId: req.session.user.id
        }
    }).then(notebooks => {
        let adm = false
        if (req.session.user.adm) {
            adm = true
        }
        let success = req.flash('success')
        const notebooksFormated = []
        notebooks.forEach(notebook => {
            const notebookSet = {
                id: notebook.id,
                name: notebook.name,
                content: notebook.content,
                createdAt: new Date(notebook.createdAt).toLocaleDateString('pt-BR', {timeZone: 'America/Sao_Paulo'}),
                updatedAt: new Date(notebook.updatedAt).toLocaleDateString('pt-BR', {timeZone: 'America/Sao_Paulo'})
            }
            notebooksFormated.push(notebookSet)
        })
        success = (success == undefined || success.length == 0) ? undefined : success
        res.render('users/notebook/index', { userName: req.session.user.name, notebooksFormated, adm, success })
    }).catch(err => {
        console.log(err)
    })
})

//Rota para cadastro de novo Caderno Virtual
router.post('/save', userAuth, (req, res) => {
    const { name, content } = req.body
    Notebook.create({
        name: name,
        content: content,
        userId: req.session.user.id
    }).then(() => {
        req.flash('success', 'Caderno Virtual criado com sucesso!')
        res.redirect('/users/panel/notebooks/')
    })
})

//Rota para edição de Caderno Virtual
router.post('/edit/:id', (req, res) => {
    const { name, content } = req.body
    Notebook.update({
        name: name,
        content: content
    },
    {
        where: {
            id: req.params.id
        }
    }).then(() => {
        req.flash('success', 'Caderno Virtual editado com sucesso!')
        res.redirect('/users/panel/notebooks/')
    }).catch(err => {
        console.log(err)
    })
})

//Rota para deletar um Caderno Virtual
router.post('/delete/:id', (req, res) => {
    Notebook.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        req.flash('success', 'Caderno Virtual excluído com sucesso!')
        res.redirect('/users/panel/notebooks/')
    }).catch(err => {
        console.log(err)
    })
})

module.exports = router