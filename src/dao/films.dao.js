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
    insert: (title, description, year, language, rental_duration, rental_rate, replacement_cost, rating, callback) => {
        let original_language_id = undefined
        let special_features = 'Trailers,Deleted Scenes'
        database.query(
            `INSERT INTO film 
                (title, description, release_year, language_id, original_language_id, rental_duration, rental_rate, replacement_cost, rating, special_features) 
            VALUES 
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                title,
                description,
                year,
                language,
                original_language_id,
                rental_duration,
                rental_rate,
                replacement_cost,
                rating,
                special_features
            ],
            (error, results) => {
                if (error) return callback(error, undefined);
                if (results) return callback(undefined, results);
            }
        )
    }
};

module.exports = filmsDao