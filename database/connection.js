const { Sequelize } = require('sequelize')

const connection = new Sequelize('tcc', 'root', 'felipe11', {
    dialect: 'mysql',
    timezone: '-03:00'
})

module.exports = connection