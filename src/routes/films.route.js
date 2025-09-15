var express = require('express');
var router = express.Router();

const filmsController = require('../controllers/films.controller');

router.get('/', filmsController.get);
router.get('/:filmId/details', filmsController.get)
router.get('/:filmId/edit', filmsController.update)
router.post('/:filmId/edit', filmsController.update)
router.delete('/:filmId', filmsController.delete);
router.get('films/create', filmsController.createFilm)
router.post('/films/create', filmsController.createFilm)

module.exports = router;
