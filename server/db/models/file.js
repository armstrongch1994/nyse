const Sequelize = require('sequelize')
const db = require('../db')

const File = db.define('file', {
  companyId: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  companyName: {
    type: Sequelize.STRING
  },
  sharePriceDate: {
    type: Sequelize.DATE
  },
  sharePrice: {
    type: Sequelize.DECIMAL
  },
  comments: {
    type: Sequelize.TEXT
  }
})

module.exports = File
