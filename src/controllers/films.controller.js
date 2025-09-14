const filmsService = require('../services/films.service');
const logger = require('../utils/logger');

const filmsController = {
    // validate: ( req, res, next ) => {
    //     let filmId = req.params.filmId;
    //     let{firstName, lastName, active, email} = req.body
    //     active = parseInt(active)
    //     usersService.validate(firstName, lastName, active, email, (error) => {
    //         if (error) next(error)
    //         next()
    //     })
    // },
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
    },
    insert: (req, res, next) => {
        let {title, description, year, language, rental_duration, rental_rate, replacement_cost, rating} = req.body;
        filmsService.insert(title, description, year, language, rental_duration, rental_rate, replacement_cost, rating, (error, results) => {
            if (error) next(error)
            if (results) {
                this.get()
            }
        })
    },
    delete: ( req, res, next) => {
        let filmId = req.params.filmId; 
        filmsService.delete(filmId, (error, result) => {
            if (error) res.json({
                status:500,
                message: error,
                data: []
            });
            if (result) res.json({
                status:200,
                message: 'film Deleted',
                data: []
            });
        });
    }
};

module.exports = filmsController;