const filmsDao = require('../dao/films.dao');
const logger = require('../utils/logger');

const filmsService = {
    get: (filmId, callback) => {
        let query;
        let query_parameters;
        filmId == undefined     
        ? query = `SELECT * FROM ??`
        : query = `SELECT f.film_id, f.title, f.description, f.rental_rate, f.rating, f.replacement_cost, f.length, l.name AS language,
            GROUP_CONCAT(c.name SEPARATOR ', ') AS genres
            FROM film f
            JOIN language l ON f.language_id = l.language_id
            LEFT JOIN film_category fc ON f.film_id = fc.film_id
            LEFT JOIN category c ON fc.category_id = c.category_id
            WHERE f.film_id = ?
            GROUP BY f.film_id`;
        // query = `SELECT * FROM ?? WHERE ?? = ?`,
        filmId == undefined 
        ? query_parameters = ['film']
        : query_parameters = [filmId];
        // query_parameters= ['film', 'film_id', filmId],
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
    insert: (title, description, year, language, rental_duration, rental_rate, replacement_cost, rating, callback) => {
        actorsDao.insert(title, description, year, language, rental_duration, rental_rate, replacement_cost, rating, (error, results) => {
            if (error) callback(error, undefined)
            if (results) callback(undefined, error)
        })
    }
};

module.exports = filmsService;