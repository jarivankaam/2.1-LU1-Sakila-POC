var express = require('express');
var router = express.Router();

const usersController = require('../controllers/users.controller');

router.get('/', usersController.get);
router.get('/:userId/details', usersController.get)

module.exports = router;
