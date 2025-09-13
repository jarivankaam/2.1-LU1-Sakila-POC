const database = require('../db/sql/connection_pool');
const logger = require('../utils/logger');

const usersDao = {
    get:(userId, callback)=>{
        database.query(
            userId == undefined 
            ? `SELECT * FROM ?? WHERE ?? = ?`
            : `SELECT * FROM ?? WHERE ?? = ?`,
            userId == undefined 
            ? ['customer', 'active', 1]
            : ['customer', 'customer_id', userId],
            (error, results) => {
                if (error) return callback(error, undefined);
                return callback(undefined, results);
            }   
        )
    },
};

module.exports = usersDao