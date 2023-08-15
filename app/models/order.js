const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  bookID: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  adminID: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
  },
  quantity: Number,
  orderDate: {
    type: Date,
    default: Date.now,
  },
  deliveryDate: Date,
  notes: String,
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
