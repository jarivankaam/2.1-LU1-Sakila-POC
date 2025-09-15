const database = require('../db/sql/connection_pool');
const logger = require('../utils/logger');

const filmsDao = {
    get:(query_database, query_parameters, callback)=>{
        database.query(
            query_database,
            query_parameters,
            (error, results) => {
                if (error) return callback(error, undefined);
                return callback(undefined, results);
            }   
        )
    },
    update: (title, description, length, filmId, callback) => {
        database.query(
            `UPDATE ?? SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?`,
            [
                'film', 
                'title', 
                title, 
                'description', 
                description, 
                'length',
                length,
                'film_id', 
                filmId
            ],
            (error, results) => {
                if (error) return callback(error, undefined);
                if (results) return callback(undefined, results);
            }   
        )
    },
    createFilm: (data, callback) => {
        let original_language_id = undefined
        let special_features = 'Trailers,Deleted Scenes'
        database.query(
            `INSERT INTO film 
                (title, description, release_year, language_id, original_language_id, rental_duration, rental_rate, replacement_cost, rating, special_features) 
            VALUES 
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                data.title,
                data.description,
                data.release_year,
                data.language_,
                original_language_id,
                data.rental_duration,
                data.rental_rate,
                data.replacement_cost,
                data.rating,
                special_features
            ],
            (error, results) => {
                if (error) return callback(error, undefined);
                if (results) return callback(undefined, results.insertId);
            }
        )
    },
    addFilmCategory: (filmId, categoryId, callback) => {
        database.query(
            `INSERT INTO film_category (??, ??, ??) VALUES (?, ?, NOW())`,
            ['film_id', 'category_id', 'last_update', filmId, categoryId],
            (error, results) => {
            if (error) callback(error, undefined)
            if (results) callback(undefined, results)
        })
    },

    addFilmActor: (filmId, actorId, callback) => {
        db.query(
            `INSERT INTO film_actor (??, ??, ??) VALUES (?, ?, NOW())`,
            ['actor_id', 'film_id', 'last_update', actorId, filmId],
            (error, results) => {
            if (error) callback(error, undefined)
            if (results) callback(undefined, results)
        })
        },
    delete: (filmId, callback) => {
        database.query(
            `UPDATE ?? SET ?? = ? WHERE ?? = ?`,
            ['film', 'active', 0, 'film_id', filmId],
            (error, results) => {
                if (error) {
                    logger.debug(error, filmId)
                    return callback(error, undefined);
                }
                if (results) {
                    logger.debug(filmId)
                    return callback(undefined, results);
                }
        })
    },
};

module.exports = filmsDao