const mongoose = require('mongoose'); 

var episodeSchema = new mongoose.Schema({  
  DBid: Number,
  episode_number: Number,
  aired_date: String,
  title: {
    en: String,
    ja: String
  },
  description: String,
  characters: []
});

module.exports = mongoose.model('episode', episodeSchema);