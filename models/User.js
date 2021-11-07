const Sequelize = require('sequelize')
const connection = require('../database/connection')

const User = connection.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    adm: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})

User.sync({ force: false })

module.exports = User