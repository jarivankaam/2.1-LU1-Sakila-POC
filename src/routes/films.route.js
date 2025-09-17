var express = require('express');
var router = express.Router();

const filmsController = require('../controllers/films.controller');
const authController = require('../controllers/auth.controller')

router.get('/', authController.isLoggedIn, filmsController.get);
router.get('/:filmId/details', authController.isLoggedIn, filmsController.get)
router.get('/:filmId/edit', authController.isLoggedIn, filmsController.update)
router.post('/:filmId/edit', authController.isLoggedIn, filmsController.update)
router.delete('/:filmId', authController.isLoggedIn, filmsController.delete);
router.get('/create', authController.isLoggedIn, filmsController.createFilm)
router.post('/create', authController.isLoggedIn, filmsController.createFilm)

module.exports = router;
