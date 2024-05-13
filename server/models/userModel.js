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
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },  
  followers: {
    type: Number,
  },
  following: {
    type: Number,
  },
  lists: [{
    name: String,
    items: [String]
  }],
  listQuantity: {
    type: Number,
  },
  albumQuantity: {
    type: Number,
  },
  reviewQuantity: {
    type: Number,
  },
  
}, { timestamps: true } )

module.exports = mongoose.model('User', userSchema)