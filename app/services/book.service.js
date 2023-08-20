const Book = require('../models/book');
const deleteCloudinaryImage = require('../helper/cloudinary/deleteCloudinaryImage');
const getImageIdFromSecureUrl = require('../helper/cloudinary/getImageIdFromSecureUrl')
const ApiError = require('../api-error');
const { image } = require('../middleware/cloudinary');

class BookService {
  async createNewBook(newBookInfor) {
    newBookInfor.displayTitle = newBookInfor.name +  'Volume ' + newBookInfor?.volume;
    const newBook = new Book(newBookInfor);
    await newBook.save();
    return newBook;
  }

  async createNewImage(bookId ,url){
    await Book.findByIdAndUpdate(bookId, {$push: {images: url}});
    return url;
  }

  async deleteImage(bookId, publicId){
    const book = await Book.findById(bookId);
    book.images = book.images.filter(image => {
      const publicIdDB = getImageIdFromSecureUrl(image);
      return publicIdDB !== publicId
    })
    await deleteCloudinaryImage(publicId);

    await book.save();
  }
}

module.exports = BookService;
