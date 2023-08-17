const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.route('/verify-email').get(authController.verifyEmail);

router.route('/verify-refresh-token').get(authController.verifyRefreshToken);

module.exports = router;
