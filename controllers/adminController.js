//Importando módulo e instanciando o módulo de rotas do Express
const express = require('express')
const router = express.Router()

//Rota de painel do admin
router.get('/admin/panel', (req, res) => {
    res.render('users/admin/panel')
})

//Importando rotas do admin
module.exports = router