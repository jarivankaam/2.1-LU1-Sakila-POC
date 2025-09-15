const categoriesDao = require('../dao/categories.dao');

const categoriesService = {
    createCategories: (categories, callback) => {
        const ids = []
        let pending = categories.length
        if (pending === 0) return callback('At least one category required', undefined)
        categories.forEach(category => {
            if (!category || category.trim() === '') {
                pending--
                if (pending === 0) callback(undefined, ids)
                return
            }
            categoriesDao.createCategory(category, (error, id) => {
                if (error) return callback(error)
                ids.push(id)
                pending--
                if (pending === 0) callback(undefined, ids)
            })
        })
    }
}

module.exports = categoriesService