const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const albumSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  band: String, 
  release: String,
  genre: String,
  songs: {
    type: [String],
    required: true
  },
  ratings: [{ type: Number, min: 0, max: 5 }],
  reviews: [{ type: String }]
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
