const categoriesDao = require('../services/categories.dao');

const categoriesService = {
    insert: (category, callback) => {
        categoriesDao.insert(category, (error, results) => {
            if (error) callback(error, undefined)
            if (results) callback(undefined, error)
        })
    }
}

module.exports = categoriesService