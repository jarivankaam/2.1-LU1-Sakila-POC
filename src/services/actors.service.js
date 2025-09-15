const actorsDao = require('../dao/actors.dao');

const actorsService = {
    createActors: (actors, callback) => {
        const ids = []
        let pending = actors.length
        if (pending === 0) return callback(new Error('At least one actor required'))
        actors.forEach(actor => {
            if (!actor.first_name || !actor.last_name) {
                pending--
                if (pending === 0) callback(null, ids)
                return
            }
            actorsDao.createActor(actor.first_name, actor.last_name, (err, id) => {
                if (err) return callback(err)
                ids.push(id)
                pending--
                if (pending === 0) callback(null, ids)
            })
        })
    }
}

module.exports = actorsService