const film_categoriesService = require('../services/film_categories.service');

const film_categoriesController = {
    insert: (req, res, next) => {
        let {film_id, category} = req.body
        film_categoriesService.insert(film_id, category, (error, results) => {
            if (error) next(error)
            if (results) next()
        })
    }
}

module.exports = film_categoriesController