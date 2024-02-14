const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
  token: {
    require: true,
    type: String
  }
})

module.exports = mongoose.model('Data', dataSchema)
