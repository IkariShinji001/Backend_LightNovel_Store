const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genresSchema = new Schema({
  type: String,
  description: String,
});

const Genres = mongoose.model('Genres', genresSchema);

module.exports = Genres;
