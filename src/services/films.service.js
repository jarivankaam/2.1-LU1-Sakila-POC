const filmsDao = require('../dao/films.dao');
const logger = require('../utils/logger');

const filmsService = {
    get: (filmId, callback) => {
        let query;
        let query_parameters;
        filmId == undefined     
        ? query = `SELECT * FROM ?? WHERE ?? = ?`
        : query = `SELECT f.film_id, f.title, f.description, f.rental_rate, f.rating, f.replacement_cost, f.length, l.name AS language,
            GROUP_CONCAT(c.name SEPARATOR ', ') AS genres
            FROM film f
            JOIN language l ON f.language_id = l.language_id
            LEFT JOIN film_category fc ON f.film_id = fc.film_id
            LEFT JOIN category c ON fc.category_id = c.category_id
            WHERE f.film_id = ?
            GROUP BY f.film_id`;
        filmId == undefined 
        ? query_parameters = ['film' , 'active', 1]
        : query_parameters = [filmId];
        filmsDao.get(query, query_parameters, (error, films) => {
            if (error) return callback(error, undefined);
            if (films) {
                logger.info(`Retrieved ${films.length} films from the database.`);
                return callback(undefined, films);
            }
        });
    },
    update: (title, description, length, filmId, callback) => {
        filmsDao.update(title, description, length, filmId, (error, result) => {
            if (error) return callback(error, undefined);
            if (result.affectedRows === 0) {
                logger.debug("film not found");
            } else {
                logger.debug("film updated")
                return callback(undefined, result);
            }
        })
    },
    getFilmByTitle: (title, callback) => {
        filmsDao.getFilmByTitle(title, callback)
    },
    createFilm: (filmData, callback) => {
        filmsDao.createFilm(filmData, callback)
    },
    addFilmCategories: (filmId, categoryIds, callback) => {
        let pending = categoryIds.length
        if (pending === 0) return callback(undefined)

        categoryIds.forEach(catId => {
            filmsDao.addFilmCategory(filmId, catId, error => {
                if (error) return callback(error)
                pending--
                if (pending === 0) callback(undefined)
            })
        })
    },
    addFilmActors: (filmId, actorIds, callback) => {
        let pending = actorIds.length
        if (pending === 0) return callback(undefined)

        actorIds.forEach(actorId => {
            filmsDao.addFilmActor(filmId, actorId, error => {
                if (error) return callback(error)
                pending--
                if (pending === 0) callback(undefined)
            })
        })
    },
    delete: (filmId, callback) => {
        filmsDao.delete(filmId, (error, status) => {
            if (error) return callback(error, undefined);
            if (status) {
            return callback(undefined, status);
            }
        })
    }
};

module.exports = filmsService;