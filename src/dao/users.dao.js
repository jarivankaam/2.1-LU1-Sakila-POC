const database = require('../db/sql/connection_pool');
const logger = require('../utils/logger');

const usersDao = {
    get:(query, parameters, callback)=>{
        database.query(
            query,
            parameters,
            (error, results) => {
                if (error) return callback(error, undefined);
                return callback(undefined, results);
            }   
        )
    },

    update: (email, firstName, lastName, userId, callback) => {
        database.query(
            `UPDATE ?? SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?`,
            [
                'customer', 
                'first_name', 
                firstName, 
                'last_name', 
                lastName, 
                'email', 
                email, 
                'customer_id', 
                userId],
            (error, results) => {
                if (error) return callback(error, undefined);
                if (results) return callback(undefined, results);
            }   
        )
    },
    
    delete: (userId, callback) => {
        database.query(
            `UPDATE ?? SET ?? = ? WHERE ?? = ?`,
            ['customer', 'active', 0, 'customer_id', userId],
            (error, results) => {
                if (error) {
                    logger.debug(error, userId)
                    return callback(error, undefined);
                }
                if (results) {
                    logger.debug(userId)
                    return callback(undefined, results);
                }
        })
    },
};

module.exports = usersDao