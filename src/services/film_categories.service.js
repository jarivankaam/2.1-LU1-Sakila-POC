const film_categoriesDao = require('../services/film_categories.dao');

const film_categoriesService = {
    insert: (film_id, category_id, callback) => {
        film_categoriesDao.insert(film_id, category_id, (error, results) => {
            if (error) callback(error, undefined)
            if (results) callback(undefined, error)
        })
    }
}

module.exports = film_categoriesService