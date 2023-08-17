const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staff.controller');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

router
  .route('/')
  .post(authentication, authorization.admin, staffController.registerNewStaff);

router.route('/login').post(staffController.login);
module.exports = router;
