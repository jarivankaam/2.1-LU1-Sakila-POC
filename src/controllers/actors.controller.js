const actorsService = require('../services/actors.service');

const actorsController = {
    insert: (req, res, next) => {
        actorsService.insert((error, results) => {
            if (error) next(error)
            if (results) console.log(results)
        })
    }
}

module.exports = actorsController