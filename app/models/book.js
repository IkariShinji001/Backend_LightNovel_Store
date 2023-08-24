const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  star: {
    type: Number,
    min: 1,
    max: 5,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const bookSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  displayTitle: {
    type: String,
    unique: true,
    trim: true,
  },
  volume: Number,
  author: String,
  bookCover: {
    type: String,
    enum: ['cứng', 'mềm'],
  },
  numberOfPages: Number,
  publisher: String,
  weight: String,
  price: Number,
  discount: Number,
  discountCode: [{ type: Schema.Types.ObjectId, ref: 'discountCode' }],
  review: [reviewSchema],
  promotions: [String],
  limited: Boolean,
  quantity: Number,
  age: Number,
  genres: [{ type: Schema.Types.ObjectId, ref: 'Genres' }],
  images: [String],
  createdAt: { type: Date, default: Date.now },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
