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

const discountCodeSchema = new Schema({
  title: String,
  description: String,
  code: String,
  expirationDate: Date,
  isActive: Boolean,
});

const bookSchema = new Schema({
  name: {
    type: String,
    unique: true,
    index: true,
    trim: true,
  },
  volume: Number,
  author: String,
  bookCover: {
    type: String,
    enum: ['Cứng', 'Mềm'],
  },
  numberOfPages: Number,
  publisher: String,
  weight: String,
  price: Number,
  discount: Number,
  discountCode: [discountCodeSchema],
  review: [reviewSchema],
  promotions: [String],
  quantity: Number,
  age: Number,
  genres: [String],
  images: [String],
  createdAt: { type: Date, default: Date.now },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
