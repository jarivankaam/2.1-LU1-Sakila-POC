const database = require('../db/sql/connection_pool');
const logger = require('../utils/logger');

const actorsDao = {
    insert: (callback) => {
        database.query(
            `SELECT * FROM actors`,
            (error, results) => {
                if (error) return callback(error, undefined);
                if (results) return callback(undefined, results);
            }
        )
    }
}

module.exports = actorsDao