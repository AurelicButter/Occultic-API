const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/MongoDB');

var episodeSchema = new mongoose.Schema({  
  id: Number,
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