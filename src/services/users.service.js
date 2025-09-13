const { update } = require('../controllers/users.controller');
const usersDao = require('../dao/users.dao');
const logger = require('../utils/logger');
const {expect} = require('chai')

const usersService = {
    get: (userId, callback) => {
       usersDao.get(userId, (error, users) => {
           if (error) return callback(error, undefined);
           if (users) {
            logger.info(`Retrieved ${users.length} users from the database.`);
            return callback(undefined, users);
            }
       });
    },
};

module.exports = usersService;