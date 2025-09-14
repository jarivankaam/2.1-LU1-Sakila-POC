var express = require('express');
var router = express.Router();

const filmsController = require('../controllers/films.controller');

router.get('/', filmsController.get);
router.get('/:filmId/details', filmsController.get)
router.get('/:filmId/edit', filmsController.update)
router.post('/:filmId/edit', filmsController.update)
router.delete('/:filmId', filmsController.delete);
// router.post('/create', filmsController.insert, )
router.get('/create', function(req, res, next) {
  res.render('films/create');
});

module.exports = router;
