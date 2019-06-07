const router = require('express').Router()
const IncomingForm = require('formidable').IncomingForm
// everytime someone hits /upload
module.exports = function upload(req, res) {
  // create a new form
  var form = new IncomingForm()
  // register callbacks on that form
  form.on('file', (field, file) => {
    console.log(file)
    console.log(field)
  })

  form.on('end', () => {
    res.json()
  })
  form.parse(req)
}
