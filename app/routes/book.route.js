const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');
const upload = require('../middleware/multer');
const uploadSingleImageCoudinary = require('../middleware/uploadImage');

router.route('/')
    .post(bookController.createNewBook);

router.route('/:id/images')
    .post(upload.single('image'), uploadSingleImageCoudinary, bookController.createBookImage);

router.route('/:id/images/:publicId')
    .delete(bookController.deleteBookImage);
module.exports = router;
