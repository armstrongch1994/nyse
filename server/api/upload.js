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
            // with enough time I would have queried for the file in the database to see if it already existed
            // if it did I would have cecked the share price to verify that the shareprice was not 10 times more than the one that was already in the database
            // if it did not I would create the new file.
            // additionally I need to add a max length of 256 characters to the comments column of the file table to
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
