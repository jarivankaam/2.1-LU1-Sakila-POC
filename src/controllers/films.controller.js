const filmsService = require('../services/films.service');
const categoriesService = require('../services/categories.service')
const actorsService = require('../services/actors.service')
const inventoriesService = require('../services/inventories.service')
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
        createFilm: (req, res, next) => {
        if (req.method == 'GET') {
            res.render(`/films/create`)
        }
        else {
            const { title, description, release_year, language_id, categories, actors, store_id } = req.body
            // creating category/categories
            categoriesService.createCategories(categories, (error, categoryIds) => {
                if (error) return next(error)
                else {
                    // creating actor(s)
                    actorsService.createActors(actors, (error, actorIds) => {
                        if (error) return next(error)
                        else {
                            // 3. Creating film
                            filmsService.createFilm({ title, description, release_year, language_id, rental_duration, rental_rate, replacement_cost, rating }, (error, filmId) => {
                                if (error) return next(error)
                                else {
                                    // 4. Linking films and category/categories
                                    filmsService.addFilmCategories(filmId, categoryIds, (error) => {
                                        if (error) return next(error)
                                        else {
                                            // 5. Linking films and actor(s)
                                            filmsService.addFilmActors(filmId, actorIds, (error) => {
                                                if (error) return next(error)
                                                else{
                                                    // 6. Linking film to store in inventory
                                                    inventoriesService.addFilmToInventory(filmId, store_id, (error) => {
                                                        if (error) return next(error)
                                                        else {
                                                            res.status(201).json({ 
                                                            message: 'Film created successfully', filmId, title 
                                                            })
                                                        } 
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
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