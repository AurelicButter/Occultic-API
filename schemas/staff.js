const mongoose = require('mongoose'); 

var staffSchema = new mongoose.Schema({  
  DBid: Number,
  name: {
    first: String, 
    surname: String,
    ja: String
  },
  gender: String,
  position: String,
  description: String,
});

module.exports = mongoose.model('staff', staffSchema);