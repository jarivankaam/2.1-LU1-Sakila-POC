const categoriesService = require('../services/categories.service');

const categoriesController = {
    get: (next) => {
        categoriesService.get((error, results) => {
            if (error) next(error)
            if (results) console.log('results: ' + results)
                // res.render('films/catalog', {genres: genre}, {actors: actors})
        })
    }
}

module.exports = categoriesController