const Book = require('../models/book');
const deleteCloudinaryImage = require('../helper/cloudinary/deleteCloudinaryImage');
const getImageIdFromSecureUrl = require('../helper/cloudinary/getImageIdFromSecureUrl');
const ApiError = require('../api-error');

class BookService {
  async createNewBook(newBookInfor) {
    const existedBook = await Book.findOne({name: newBookInfor.name,  volume: newBookInfor.volume});

    if(existedBook){
      throw new ApiError(400, 'Đã tồn tại quyển sách này');
    }

    newBookInfor.displayTitle =
      newBookInfor.name + ' Volume ' + newBookInfor?.volume;
    const newBook = new Book(newBookInfor);
    await newBook.save();
    return newBook;
  }

  async createNewImage(bookId, url) {
    await Book.findByIdAndUpdate(bookId, { $push: { images: url } });
    return url;
  }

  async deleteImage(bookId, publicId) {
    const book = await Book.findById(bookId);
    
    if(!book){
      throw new ApiError(400,'Không tồn tại ID sách');
    }

    book.images = book.images.filter((image) => {
      const publicIdDB = getImageIdFromSecureUrl(image);
      return publicIdDB !== publicId;
    });
    await deleteCloudinaryImage(publicId);

    await book.save();
  }

  async updateBookInfor(bookId,updateData){
    const book = await Book.findById(bookId);

    if(!book){
      throw new ApiError(400,'Không tồn tại ID sách');
    }
    
    const existedBook = await Book.findOne({name: updateData?.name,  volume: updateData?.volume});

    if(existedBook){
      throw new ApiError(400, 'Đã tồn tại quyển sách này');
    }

    Object.assign(book, updateData);

    book.displayTitle = book.name + ' Volume ' + book?.volume;


    await book.save();
  }
}

module.exports = BookService;
