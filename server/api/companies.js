const router = require('express').Router()
const {File} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const companies = await File.findAll()
    res.json(companies)
  } catch (err) {
    next(err)
  }
})
