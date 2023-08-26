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
      next(error);
    }
  },

  async createBookImage(req, res, next) {
    const cloudinary_secure_url = req.cloudinary_secure_url;
    const bookId = req.params.id;
    try {
      const bookService = new BookService();
      const newImageUrl = await bookService.createNewImage(
        bookId,
        cloudinary_secure_url
      );
      return res.status(201).json({ newImageUrl });
    } catch (error) {
      if (error instanceof ApiError) {
        return next(new ApiError(error.statusCode, error.message));
      }
      next(error);
    }
  },

  async deleteBookImage(req, res, next) {
    const publicId = req.params.publicId;
    const bookId = req.params.id;
    try {
      const bookService = new BookService();
      await bookService.deleteImage(bookId, publicId);
      return res.status(200).json({ message: 'Đã xóa ảnh thàng công' });
    } catch (error) {
      if (error instanceof ApiError) {
        return next(new ApiError(error.statusCode, error.message));
      }
      next(error);
    }
  },

  async updateBook(req, res, next) {
    const updateData = req.body;
    const { id } = req.params;

    try {
      const bookService = new BookService();
      await bookService.updateBookInfor(id, updateData);

      return res.status(200).json({ message: 'Cập nhật thành công' });
    } catch (error) {
      if (error instanceof ApiError) {
        return next(new ApiError(error.statusCode, error.message));
      }
      next(error);
    }
  },

  async getAllBook(req, res, next) {
    try {
      const bookService = new BookService();
      await bookService.getAllBook();
    } catch (error) {
      next(error);
    }
  },

  async getBookSeries(req, res, next) {
    const { name } = req.query;
    try {
      const bookService = new BookService();
      if (name) {
        const bookSeries = await bookService.getBookSeriesByName(name);
        return res.status(200).json(bookSeries);
      }
      const bookSeries = await bookService.getAllBookSeries();

      return res.status(200).json(bookSeries);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = bookController;
