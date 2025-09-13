const film_actorsService = require('../services/film_actors.service');

const film_actorsController = {
    insert: (req, res, next) => {
        let {film_id, actor} = req.body
        film_actorsService.insert(film_id, actor, (error, results) => {
            if (error) next(error)
            if (results) next()
        })
    }
}

module.exports = film_actorsController