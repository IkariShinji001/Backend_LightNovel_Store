const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SeriesSchema = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
  },
  author: String,
  publisher: String,
  image: String,
  followerCount: Number,
  user: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  book: [{
    type: Schema.Types.ObjectId,
    ref: 'Book',
  }]
});

const Series = mongoose.model('Series', SeriesSchema);


module.exports = Series;