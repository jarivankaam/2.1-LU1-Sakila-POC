const actorsService = require('../services/actors.service');

const actorsController = {
    insert: (req, res, next) => {
        let {actor} = req.body
        actorsService.insert(actor, (error, results) => {
            if (error) next(error)
            if (results) next()
        })
    }
}

module.exports = actorsController