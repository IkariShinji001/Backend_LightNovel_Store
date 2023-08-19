const discountCodeSchema = new Schema({
    title: String,
    description: String,
    code: String,
    discount: Number,
    startDate: Date,
    expirationDate: Date,
    isActive: Boolean,
});


const discountCode = mongoose.model('discountCode', discountCodeSchema);

module.exports = discountCode;
