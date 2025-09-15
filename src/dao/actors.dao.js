const database = require('../db/sql/connection_pool');
const logger = require('../utils/logger');

const actorsDao = {
    insert: (firstName, lastName, callback) => {
        database.query(
            `INSERT INTO actor (??, ??, ??) VALUES (?, ?, NOW())`,
            ['first_name', 'last_name', 'last_update', firstName, lastName],
            (error, results) => {
                if (error) return callback(error, undefined);
                if (results) return callback(undefined, results.insertId);
            }
        )
    }
}

module.exports = actorsDao