const { Sequelize } = require('sequelize')

const connection = new Sequelize('tcc', 'root', '123456', {
    dialect: 'mysql',
    timezone: '-03:00',
    logging: false
})

module.exports = connection