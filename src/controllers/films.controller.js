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
        CreateFilm: (req, res, next) => {
        const { title, description, release_year, language_id, categories, actors, store_id } = req.body
        // creating category/categories
        categoryService.createCategories(categories, (error, categoryIds) => {
            if (error) return next(error)
            else {
                // creating actor(s)
            actorService.createActors(actors, (error, actorIds) => {
            if (error) return next(error)

            // 3. film aanmaken
            filmService.createFilm({ title, description, release_year, language_id }, (error, filmId) => {
                if (error) return next(error)

                // 4. koppelen film ↔ categorieën
                filmService.addFilmCategories(filmId, categoryIds, (error) => {
                if (error) return next(error)

                // 5. koppelen film ↔ acteurs
                filmService.addFilmActors(filmId, actorIds, (error) => {
                    if (error) return next(error)

                    // 6. inventory toevoegen
                    inventoryService.addFilmToInventory(filmId, store_id, (error) => {
                        if (error) return next(error)
                    
                        res.status(201).json({ 
                            message: 'Film created successfully', filmId, title 
                        })
                    })
                })
                })
            })
            })
            }
        })
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