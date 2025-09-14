const actorsDao = require('../services/actors.dao');

const actorsService = {
    insert: (callback) => {
        actorsDao.insert((error, results) => {
            if (error) callback(error, undefined)
            if (results) callback(undefined, results)
        })
    }
}

module.exports = actorsService