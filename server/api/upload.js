const router = require('express').Router()
const IncomingForm = require('formidable').IncomingForm
const csv = require('csv-parser')
const fs = require('fs')
const {File} = require('../db/models')

// everytime someone hits /upload
module.exports = function upload(req, res) {
  var form = new IncomingForm()

  form.on('file', (field, file) => {
    console.log('file.path', file.path)
    console.log('field', field)
    //console.log(Formidable.File#toJSON());

    // const json = file.toJSON()
    // let parsedFile = JSON.stringify(json)
    // console.log('parsedFile', parsedFile)
    // console.log('path', parsedFile.path)
    fs
      .createReadStream(file.path)
      .pipe(csv())
      .on('data', async row => {
        console.log(row)
        let newFile = await File.create(row)

        console.log(newFile)
      })
      .on('end', () => {
        console.log('CSV file successfully processed')
      })
  })

  form.on('end', () => {
    res.json()
  })
  form.parse(req)
}
