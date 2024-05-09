const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  }, 
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  followers: {
    type: Number,
  },
  following: {
    type: Number,
  },
  listQuantity: {
    type: Number,
  },
  albumQuantity: {
    type: Number,
  },
  reviewQuantity: {
    type: Number,
  }
  
}, { timestamp: true } )

module.exports = mongoose.model('User', userSchema)