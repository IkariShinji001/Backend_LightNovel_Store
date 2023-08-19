const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authentication = require('../middleware/authentication');

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.register)
    .patch(authentication,userController.resetPassword)

router.route('/login')
    .post(userController.login);

module.exports = router;
