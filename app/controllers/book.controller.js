const BookService = require('../services/book.service');
const ApiError = require('../api-error');

const bookController = {
  async createNewBook(req, res, next) {
    const newBookInfor = req.body;
    try {
      const bookService = new BookService();
      const newBook = await bookService.createNewBook(newBookInfor);
      return res.status(201).json(newBook);
    } catch (error) {
      if (error instanceof ApiError) {
        return next(new ApiError(error.statusCode, error.message));
      }
      console.log(error);
      return res.status(500).json({ message: 'Lỗi không xác định' });
    }
  },
};

module.exports = bookController;
