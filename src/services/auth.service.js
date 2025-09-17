const logger = require('../utils/logger');
const authDao = require('../dao/auth.dao'); 
const { expect } = require('chai');
const passwordHash = require('../utils/passwordHasher')

const authService = {
    validate:(email, password, callback) => {
        try {
            expect(email).to.be.a('string', 'email should be a string');
            expect(password).to.be.a('string', 'password should be a string');
            return callback()
        }
        catch (err) {
            return callback(err)
        }
    },
    login:(email, plainPassword, callback) => {
        authDao.login(email, (error, user) => {
            if (error) {return callback(error, undefined);}
            else {
                passwordHash.verify(plainPassword, user[0].password, (error, isValid) => {
                    if (error) {return callback(error, undefined)}
                    else if(isValid == true) {
                        return callback(undefined, {
                        firstName: user[0].first_name,
                        customerId: user[0].customer_id
                        });
                    } 
                    else {
                        error = new Error('password not valid')
                        return callback(error, undefined)
                    }
                    
                });
            }
            
        })
    },
    hash: (password, callback) => {
        bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            console.log(hash)
        });
        });
    }
}

module.exports = authService;