const inventoriesDao = require('../dao/inventories.dao');
const logger = require('../utils/logger');

const inventoriesService = {
    addFilmToInventory: (filmId, storeId, callback) => {
        inventoriesDao.addFilmToInventory(filmId, storeId, callback)
    }
}

module.exports = inventoriesService