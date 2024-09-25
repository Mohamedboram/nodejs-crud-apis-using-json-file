const mongoose = require('mongoose');
const movieSchema = mongoose.Schema({
    name: {
      required: [true, "name is a required field"],
      type: String,
    },
    description: {
      type: String,
      required: false,
    },
    duration: {
      type: Number,
      
    },
    genre: [String],
    ratings: {
      type: Number,
      default: 1,
    },
  });
  
  const Movie = mongoose.model("movie", movieSchema);

  module.exports = Movie;