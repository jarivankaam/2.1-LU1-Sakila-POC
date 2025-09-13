const database = require('../db/sql/connection_pool');
const logger = require('../utils/logger');

const actorsDao = {
    insert: (film_id, actor_id, callback) => {
        database.query(
            `INSERT INTO film_actors 
                (film_id, actor_id) 
            VALUES 
            (?, ?)`,
            [
                film_id,
                actor_id
            ],
            (error, results) => {
                if (error) return callback(error, undefined);
                if (results) return callback(undefined, results);
            }
        )
    }
}

module.exports = actorsDao