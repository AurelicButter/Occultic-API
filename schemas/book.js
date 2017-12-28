const mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({  
  DBid: String,
  publish: String,
  title: {
    en: String,
    ja: String
  },
  description: String,
  chapters: Number,
  volumes: Number,
  genre: [],
  rating: String,
  author: String
});

module.exports = mongoose.model('book', bookSchema);