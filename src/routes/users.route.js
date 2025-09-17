var express = require('express');
var router = express.Router();

const usersController = require('../controllers/users.controller');
const authController = require('../controllers/auth.controller')

router.get('/', authController.isLoggedIn, usersController.get);
router.get('/:userId/details', authController.isLoggedIn, usersController.get)
router.get('/:userId/edit', authController.isLoggedIn, usersController.update)
router.post('/:userId/edit', authController.isLoggedIn, usersController.validate, usersController.update)
router.delete('/:userId', authController.isLoggedIn, usersController.delete);

module.exports = router;
