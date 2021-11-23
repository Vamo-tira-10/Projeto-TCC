const Sequelize = require('sequelize')
const connection = require('../database/connection')

const User = require('./User')

const Schedule = connection.define('schedules', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    start: {
        type: Sequelize.DATE,
        allowNull: false
    },
    end: {
        type: Sequelize.DATE,
        allowNull: false
    }
})

Schedule.belongsTo(User)
User.hasMany(Schedule)

//Schedule.sync({ force: false })

module.exports = Schedule

