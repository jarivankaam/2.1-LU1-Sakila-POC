const database = require('../db/sql/connection_pool');
const logger = require('../utils/logger');

const inventoriesDao = {
    createCategory: (name, callback) => {
    database.query(
        `INSERT INTO category (??, ??) VALUES (?, NOW())`,
        ['name', 'last_update', name],
        (error, result) => {
        if (error) return callback(error, undefined)
        if (results) callback(undefined, result.insertId)
    }
  )
}
}

module.exports = inventoriesDao