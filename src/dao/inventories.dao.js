const database = require('../db/sql/connection_pool');
const logger = require('../utils/logger');

const inventoriesDao = {
    addFilmToInventory: (film_id, store_id, callback) => {
    database.query(
      `INSERT INTO inventory (??, ??, ??)
      VALUES (?, ?, NOW())`,
      ['film_id', 'store_id', 'last_update', film_id, store_id],
        (error, result) => {
        if (error) return callback(error, undefined)
        if (result) callback(undefined, result.insertId)
    }
  )
}
}

module.exports = inventoriesDao