const Book = require('../models/book');
const Series = require('../models/series');
const deleteCloudinaryImage = require('../helper/cloudinary/deleteCloudinaryImage');
const getImageIdFromSecureUrl = require('../helper/cloudinary/getImageIdFromSecureUrl');
const ApiError = require('../api-error');

class BookService {
  async createNewBook(newBookInfor) {
    const existedBook = await Book.findOne({
      displayTitle: newBookInfor.displayTitle
    });

    if (existedBook) {
      throw new ApiError(400, 'Đã tồn tại quyển sách này');
    }

    newBookInfor.displayTitle =
      newBookInfor.seriesName + ' Volume ' + newBookInfor?.volume;
    const newBook = new Book(newBookInfor);
    const {_id} = await newBook.save();
    await Series.findByIdAndUpdate(seriesId, {$push: {book: _id.toString()}});
    return newBook;
  }

  async createNewImage(bookId, url) {
    await Book.findByIdAndUpdate(bookId, { $push: { images: url } });
    return url;
  }

  async deleteImage(bookId, publicId) {
    const book = await Book.findById(bookId);

    if (!book) {
      throw new ApiError(400, 'Không tồn tại ID sách');
    }

    book.images = book.images.filter((image) => {
      const publicIdDB = getImageIdFromSecureUrl(image);
      return publicIdDB !== publicId;
    });
    await deleteCloudinaryImage(publicId);

    await book.save();
  }

  async updateBookInfor(bookId, updateData) {
    const book = await Book.findById(bookId);

    if (!book) {
      throw new ApiError(400, 'Không tồn tại ID sách');
    }

    const existedBook = await Book.findOne({
      name: updateData?.name,
      volume: updateData?.volume,
    });

    if (existedBook) {
      throw new ApiError(400, 'Đã tồn tại quyển sách này');
    }

    Object.assign(book, updateData);

    book.displayTitle = book.name + ' Volume ' + book?.volume;

    await book.save();
  }

  async getAllBook() {
    const books = await Book.find({});
    return books;
  }

  async getBookSeriesByName(bookName) {
    console.log(bookName);
    const bookSeries = await Book.find({ name: bookName });
    return bookSeries;
  }

  async getAllBookSeries() {
    const bookSeries = await Book.aggregate([
      {
        $group: {
          _id: '$name',
          totalBooks: { $sum: 1 },
          exmBook: { $first: '$$ROOT' }
        },
      },
    ]);
    return bookSeries;
  }
}

module.exports = BookService;
