const router = require('express').Router()
const IncomingForm = require('formidable').IncomingForm
const csv = require('csv-parser')
const fs = require('fs')
const {File} = require('../db/models')

// everytime someone hits /upload
module.exports = function upload(req, res, next) {
  var form = new IncomingForm()

  form.on('file', (field, file) => {
    try {
      if (file.type !== 'text/csv') {
        res.status(401).send('Incorrect File type')
      } else {
        fs
          .createReadStream(file.path)
          .pipe(csv())
          .on('data', async row => {
            let newFile = await File.create(row)

            console.log(newFile)
          })
          .on('end', () => {
            console.log('CSV file successfully processed')
          })
      }
    } catch (error) {
      next(error)
    }
  })

  form.on('end', () => {
    res.json()
  })
  form.parse(req)
}
