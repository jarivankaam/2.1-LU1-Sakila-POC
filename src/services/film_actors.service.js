const film_actorsDao = require('../services/actors.dao');

const film_actorsService = {
    insert: (film_id, actor_id, callback) => {
        film_actorsDao.insert(film_id, actor_id, (error, results) => {
            if (error) callback(error, undefined)
            if (results) callback(undefined, error)
        })
    }
}

module.exports = film_actorsService