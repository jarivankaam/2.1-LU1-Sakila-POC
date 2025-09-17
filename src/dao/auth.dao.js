const logger = require('../utils/logger');
const database = require('../db/sql/connection_pool');

const authDao = {
    login: (email, callback) => {
        database.query(
            'SELECT ??, ??, ??, ?? FROM ?? WHERE ?? = ?', 
            ['first_name', 'email', 'password', 'staff_id', 'staff', 'email', email],
            (error, results) => {
                if (error) return callback(error, undefined);
                if (results) return callback(undefined, results);
            }
        )
    }
}

module.exports = authDao