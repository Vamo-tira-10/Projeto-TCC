const Sequelize = require('sequelize')
const connection = require('../database/connection')

const User = require('./User')

const FlashCard = connection.define('flashcards', {
    question: {
        type: Sequelize.STRING,
        allowNull: false
    },
    answer: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

FlashCard.belongsTo(User)
User.hasMany(FlashCard)

FlashCard.sync({ force: false })

module.exports = FlashCard
