//Importando módulo e instanciando o módulo de rotas do Express
const express = require('express')
const router = express.Router()

//Importando middleware de verificação se o usuário está autenticado no sistema
const userAuth = require('../middlewares/userAuth')

//Importando model de usuário
const User = require('../models/User')

//Rota de painel do admin
router.get('/panel', userAuth, (req, res) => {
    if (req.session.user.adm == 1) {
        req.session.lastRoute = req.originalUrl
        User.findAndCountAll({
            where: {
                adm: 0
            },
            order: [
                ['id', 'DESC']
            ]
        }).then((data) => {
            const users = []
            data.rows.forEach(row => {
                const date = new Date(row.createdAt)
                const dateFormated = date.toLocaleDateString('pt-BR', {timeZone: 'America/Sao_Paulo'});
                const user = {
                    id: row.id,
                    name: row.name,
                    email: row.email,
                    createdAt: dateFormated
                }
                users.push(user)
            })
            let success = req.flash('success')
            success = (success == undefined || success.length == 0) ? undefined : success
            res.render('users/admin/panel', { userName: req.session.user.name, count: data.count, users: users, success })
        }).catch(err => {
            console.log(err)
        })
    }
    else {
        res.redirect(req.session.lastRoute)
    }
})

//Importando rotas do admin
module.exports = router