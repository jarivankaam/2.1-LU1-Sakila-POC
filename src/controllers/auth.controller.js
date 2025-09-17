const logger = require('../utils/logger');
const authService = require('../services/auth.service');


const authController = {
    validate:(req, res, next) => {
        let { email, password } = req.body;
        authService.validate(email, password, (error) => {
            if (error) return next(error);
            next();
        });
    },
    login:(req, res, next) => {
        if (req.method == 'GET') {
            res.render('login')
        }
        else {
            let { email, password } = req.body;
            authService.login(email, password, (error, user) => {
                if (error) return next(error);
                if (user) {
                    req.session.authenticated = true;
                    req.session.user = user;
                    res.redirect(301, '/users');
                }
            });
        }
    },
    logout:(req, res, next) => {
        req.session.destroy((error) => {
            if (error) return next(error);
            res.redirect(301, '/login');
        });
    },
    isLoggedIn:(req, res, next) => {
        if(req.session.user) return next();
        const error = new Error('YOU MUST login')
        next(error)
    }
};

module.exports = authController;