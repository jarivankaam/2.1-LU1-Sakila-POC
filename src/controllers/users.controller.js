const usersService = require('../services/users.service');
const logger = require('../utils/logger');

const usersController = {
    get: ( req, res, next) => {
        let userId = req.params.userId; 
        usersService.get(userId, (error, users) => {
            if (error) next(error);
            if (users) {
                userId == undefined
                ? res.render('users/manager', {users: users})
                : res.render('users/details', {users: users[0]});
            }
    })
    },
};

module.exports = usersController;