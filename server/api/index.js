const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/upload', require('./upload'))
router.use('/companies', require('./companies'))
// this is the 404 that is given to the user when they request an api route that does not exist
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
