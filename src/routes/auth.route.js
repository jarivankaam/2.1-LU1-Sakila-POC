var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/login', authController.login);
router.post('/login', authController.validate, authController.login);

router.get('/logout', authController.isLoggedIn, authController.logout);

module.exports = router;