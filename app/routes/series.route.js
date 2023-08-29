const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const SeriesController = require('../controllers/series.controller');
const seriesController = new SeriesController();

router.route('/:id/books')
    .post(auth.employeeOnly, seriesController.addBookToSeries)


router.route('/')
    .get(seriesController.getSeries)
    .post(auth.employeeOnly, seriesController.createNewSeries)



module.exports = router;
