const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const seriesController = require('../controllers/series.controller');

router.route('/')
    .post(authMiddleware.adminOnly, seriesController.createNewSeries)


module.exports = router;
