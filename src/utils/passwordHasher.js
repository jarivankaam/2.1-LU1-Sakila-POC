const bcrypt = require('bcrypt')

const passwordHash = {
    hash: () => {
        // const password = 'ABC123!.';
        // const saltRounds = 10;
         bcrypt.hash(password, saltRounds, (error, hash) => {
            if (error) {
                console.error(error);
                process.exit(1);
            }
            console.log('Hash:', hash);
        });
    },

    verify: (userPassword, passwordHash, callback) => {
        bcrypt.compare(userPassword, passwordHash, (error, isValid) => {
            if (error) {
                return callback(error, undefined);
            }
            if (isValid) {
                return callback(undefined, isValid);
            } else {
                return callback('Wrong password', undefined);
            }
        });
    }
}

module.exports = passwordHash