//Importando módulo e instanciando o módulo de rotas do Express
const express = require('express')
const router = express.Router()

const redirecionaHttps = require('../middlewares/redirecionaHttps')

//Rota de painel do admin
router.get('/admin/panel', redirecionaHttps, (req, res) => {
    res.render('users/admin/panel')
})

//Importando rotas do admin
module.exports = router