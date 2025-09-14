const { update } = require('../controllers/users.controller');
const usersDao = require('../dao/users.dao');
const logger = require('../utils/logger');
const {expect} = require('chai')

const usersService = {
        validate: (firstName, lastName, email, callback) => {
        try{
            
            expect(firstName).to.be.a('string', 'First name should be a string')
            expect(lastName).to.be.a('string', 'Last name should be a string')
            expect(email).to.be.a('string', 'Email should be a string')

            callback(undefined)
        }
        catch(err) {
            callback(err)
        }
    },

    get: (userId, callback) => {
        let query;
        let parameters;
        let active = 1
        userId == undefined
        ? query = 'SELECT * FROM ?? WHERE ?? = ?'
        : query = `SELECT c.customer_id, c.first_name, c.last_name, c.email, c.active, a.address
            FROM customer c JOIN address a ON c.address_id = a.address_id WHERE ?? = ?`
        userId == undefined
        ? parameters = ['customer', 'active', 1]
        : parameters = ['customer_id', userId]
        usersDao.get(query, parameters, (error, users) => {
           if (error) return callback(error, undefined);
           if (users) {
            logger.info(`Retrieved ${users.length} users from the database.`);
            return callback(undefined, users);
            }
       });
    },

    update: (email, firstName, lastName, userId, callback) => {
        usersDao.update(email, firstName, lastName, userId, (error, result) => {
            if (error) return callback(error, undefined);
            if (result.affectedRows === 0) {
                logger.debug("User not found");
            } else {
                return callback(undefined, result);
            }
        })
    },

    delete: (userId, callback) => {
        usersDao.delete(userId, (error, status) => {
            if (error) return callback(error, undefined);
            if (status) {
            return callback(undefined, status);
            }
        })
    }
};

module.exports = usersService;