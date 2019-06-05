const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))

// this is the 404 that is given to the user when they request an api route that does not exist
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
