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
};

module.exports = filmsDao