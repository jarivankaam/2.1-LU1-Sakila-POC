const categoriesService = require('../services/categories.service');

const categoriesController = {
    insert: (req, res, next) => {
        let {genre} = req.body
        categoriesService.insert(genre, (error, results) => {
            if (error) next(error)
            if (results) next(results)
        })
    }
}

module.exports = categoriesController