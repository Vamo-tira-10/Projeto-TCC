const express = require('express')
const router = express.Router()

//Importando middleware de verificação se o usuário está autenticado no sistema
const userAuth = require('../middlewares/userAuth')

//Importando model de Agenda
const Schedule = require('../models/Schedule')

//Rota para a página principal de Agenda
router.get('/', userAuth, (req, res) => {
    req.session.lastRoute = req.originalUrl
    let adm = false
    if (req.session.user.adm) {
        adm = true
    }
    let success = req.flash('success')
    success = (success == undefined || success.length == 0) ? undefined : success
    res.render('users/schedule/index', { userName: req.session.user.name, adm, success })
})

router.get('/getcalendar', (req, res) => {
    Schedule.findAll({
        where: {
            userId: req.session.user.id
        }
    }).then(schedules => {
        res.json(schedules)
    })
})

//Rota para cadastro de novo evento na Agenda
router.post('/save', userAuth, (req, res) => {
    const { title, dateStart, dateEnd, timeStart, timeEnd } = req.body

    const dayStart = dateStart.split('/')[0]
    const monthStart = dateStart.split('/')[1]
    const yearStart = dateStart.split('/')[2]

    const dayEnd = dateEnd.split('/')[0]
    const monthEnd = dateEnd.split('/')[1]
    const yearEnd = dateEnd.split('/')[2]

    const start = `${yearStart}-${monthStart}-${dayStart} ${timeStart}`
    const end = `${yearEnd}-${monthEnd}-${dayEnd} ${timeEnd}`

    Schedule.create({
        title: title,
        start: start,
        end: end,
        userId: req.session.user.id
    }).then(() => {
        req.flash('success', 'Evento cadastrado com sucesso!')
        res.redirect('/users/panel/schedules/')
    }).catch(err => {
        console.log(err)
    })
})

//Rota para editar evento da Agenda
router.post('/edit/:id', (req ,res) => {
    const { title, description, dateStart, dateEnd, timeStart, timeEnd } = req.body

    const dayStart = dateStart.split('/')[0]
    const monthStart = dateStart.split('/')[1]
    const yearStart = dateStart.split('/')[2]

    const dayEnd = dateEnd.split('/')[0]
    const monthEnd = dateEnd.split('/')[1]
    const yearEnd = dateEnd.split('/')[2]

    const start = `${yearStart}-${monthStart}-${dayStart} ${timeStart}`
    const end = `${yearEnd}-${monthEnd}-${dayEnd} ${timeEnd}`
    Schedule.update({
        title: title,
        description: description,
        start: start,
        end: end
    },
    {
        where: {
            id: req.params.id
        }
    }).then(() => {
        req.flash('success', 'Evento editado com sucesso!')
        res.redirect('/users/panel/schedules/')
    }).catch(err => {
        console.log(err)
    })
})

router.post('/delete/:id', (req, res) => {
    Schedule.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        req.flash('success', 'Evento excluído com sucesso!')
        res.redirect('/users/panel/schedules/')
    }).catch(err => {
        console.log(err)
    })
})

module.exports = router