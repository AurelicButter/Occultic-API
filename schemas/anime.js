const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/MongoDB');

var animeSchema = new mongoose.Schema({  
    DBid: String,
    dates: {
      start: String,
      end: String
    },
    title: {
      en: String,
      ja: String
    },
    description: String,
    episode_count: Number,
    producers: [],
    licensor: String,
    studio: String,
    source: String,
    genre: [],
    rating: String,
    episode_duration: Number,
    music: {
      opening: [],
      ending: []
    },
    staff: [{ DBid: String, position: String}]
});

module.exports = mongoose.model('anime', animeSchema);