const usersService = require('../services/users.service');
const logger = require('../utils/logger');

const usersController = {
    validate: ( req, res, next) => {
        // let userId = req.params.userId;
        let{firstName, lastName, email} = req.body
        usersService.validate(firstName, lastName, email, (error) => {
            if (error) next(error)
            next()
        })
    },
    
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

    update: ( req, res, next) => {
        let userId = req.params.userId;
        let{ firstName, lastName, email} = req.body;
        req.method == 'GET'
        ? usersService.get(userId, (error, users) => {
            if (error) next(error);
            if (users) res.render('users/edit', {users: users[0]});
        })
        : usersService.update(email, firstName, lastName, userId, (error, result) => {
            if (error) next(error);
            if (result) {
                res.redirect(301, `/users/${userId}/details`)
            }
        });
    },
    
    delete: ( req, res, next) => {
        let userId = req.params.userId; 
        usersService.delete(userId, (error, result) => {
            if (error) res.json({
                status:500,
                message: error,
                data: []
            });
            if (result) res.json({
                status:200,
                message: 'User Deleted',
                data: []
            });
        });
    }
};

module.exports = usersController;