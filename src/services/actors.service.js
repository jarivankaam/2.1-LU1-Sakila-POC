const actorsDao = require('../services/actors.dao');

const actorsService = {
    insert: (actor, callback) => {
        actorsDao.insert(actor, (error, results) => {
            if (error) callback(error, undefined)
            if (results) callback(undefined, error)
        })
    }
}

module.exports = actorsService