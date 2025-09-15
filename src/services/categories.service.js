const categoriesDao = require('../services/categories.dao');

const categoriesService = {
    get: (category, callback) => {
        categoriesDao.validate(category, (results) => {
            if (results == undefined) {
                categoriesDao.insert(category,(error, results) => {
                if (error) callback(error, undefined)
                if (results) callback(undefined, results)
                })
            }
            else {
                let category_id = results.category_id
                callback(undefined, category_id)
            }
        }) 
        
    }
}

module.exports = categoriesService