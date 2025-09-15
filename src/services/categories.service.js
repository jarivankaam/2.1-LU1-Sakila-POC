const categoriesDao = require('../dao/categories.dao');

const categoriesService = {
    createCategories: (categories, callback) => {
        const ids = []
        let index = 0
        let pending = categories.length
        function processNext() {
        if (index >= pending) return callback(undefined, ids)
        const name = categories[index].trim()
        if (!name) {
            index++
            return processNext()
        }
        categoriesDao.getCategoryByName(name, (error, existing) => {
        if (error) return callback(error)

        if (existing) {
          ids.push(existing.category_id)
          index++
          processNext()
        } else {
          categoriesDao.createCategory(name, (error, newId) => {
            if (error) return callback(error)
            ids.push(newId)
            index++
            processNext()
          })
        }
      })
    }
    processNext()
    }
}

module.exports = categoriesService