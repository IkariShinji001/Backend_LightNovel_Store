const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.route('/verify-email').get(authController.verifyEmail);

module.exports = router;
