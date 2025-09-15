const categoriesService = require('../services/categories.service');

const categoriesController = {
    get: (req, res, next) => {
        categoriesService.get((error, category_id) => {
            if (error) next(error)
            if (category_id) {
                console.log('results: ' + category_id)
                res.locals.category_id = category_id
            }
        })
    }
}

module.exports = categoriesController