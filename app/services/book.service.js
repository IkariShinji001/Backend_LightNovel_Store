const Book = require('../models/book');
const ApiError = require('../api-error');

class BookService {
  async createNewBook(newBookInfor) {
    newBookInfor.displayTitle = newBookInfor.name +  'Volume ' + newBookInfor?.volume;
    console.log(newBookInfor);
    const newBook = new Book(newBookInfor);
    await newBook.save();
    return newBook;
  }
}

module.exports = BookService;
