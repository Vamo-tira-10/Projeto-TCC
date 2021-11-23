const Sequelize = require('sequelize')
const connection = require('../database/connection')

const User = require('./User')

const Notebook = connection.define('notebooks', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING(10000),
        allowNull: false
    }
})

Notebook.belongsTo(User)
User.hasMany(Notebook)

//Notebook.sync({ force: false })

module.exports = Notebook