const database = require('../db/sql/connection_pool');
const logger = require('../utils/logger');

const actorsDao = {
    createActor: (firstName, lastName, callback) => {
        database.query(
            `INSERT INTO actor (??, ??, ??) VALUES (?, ?, NOW())`,
            ['first_name', 'last_name', 'last_update', firstName, lastName],
            (error, results) => {
                if (error) return callback(error, undefined);
                if (results) return callback(undefined, results.insertId);
            }
        )
    },
    getActorByName: (first_name, last_name, callback) => {
        database.query(
            'SELECT * FROM ?? WHERE ?? = ? AND ?? = ?',
            ['actor', 'first_name', first_name, 'last_name', last_name],
            (error, results) => {
                if (error) return callback(error)
                callback(null, results[0])
            }
        )
    }
}

module.exports = actorsDao