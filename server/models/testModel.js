const mongoose = require('mongoose')

const Schema = mongoose.Schema

const testSchema = new Schema({
  title: {
    type: String,
    required: true
  }, 
  quantity: {
    type: Number,
    required: true
  },
  load: {
    type: Number,
    required: true
  }

}, { timestamp: true } )

module.exports = mongoose.model('Test', testSchema)