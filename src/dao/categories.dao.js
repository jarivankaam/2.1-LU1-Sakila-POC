const database = require('../db/sql/connection_pool');
const logger = require('../utils/logger');

const categoriesDao = {
    createCategory: (category, callback) => {
        database.query(
            `INSERT INTO category (??, ??)
                VALUES (?, NOW());`,
                ['name', 'last_update', category],
            (error, results) => {
                if (error) return callback(error, undefined);
                if (results) return callback(undefined, results.insertId);
            }
        )
    }
}

module.exports = categoriesDao