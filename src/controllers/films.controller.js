const filmsService = require('../services/films.service');
const logger = require('../utils/logger');

const filmsController = {
    get: ( req, res, next) => {
        let filmId = req.params.filmId; 
        filmsService.get(filmId, (error, films) => {
            if (error) next(error);
            if (films) {
                filmId == undefined
                ? res.render('films/catalog', {films: films})
                : res.render('films/details', {films: films[0]});
            }
        })
    },
    update: (req, res, next) => {
        let filmId = req.params.filmId;
        let {title, description, length} = req.body;
        req.method == 'GET'
        ? filmsService.get(filmId, (error, films) => {
            if (error) next(error);
            if (films) res.render('films/edit', {films: films[0]});
        })
        : filmsService.update(title, description, length, filmId, (error, result) => {
            if (error) next(error);
            if (result) {
                res.redirect(301, `/films/${filmId}/details`)
            }
        });
    }
};

module.exports = filmsController;