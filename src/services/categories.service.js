const categoriesDao = require('../services/categories.dao');

const categoriesService = {
    get: (callback) => {
        categoriesDao.insert((error, results) => {
            if (error) callback(error, undefined)
            if (results) callback(undefined, error)
        })
    }
}

module.exports = categoriesService