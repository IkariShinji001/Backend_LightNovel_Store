const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');

router.route('/')
    .post(bookController.createNewBook);


module.exports = router;
