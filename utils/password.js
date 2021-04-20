const bcrypt = require('bcrypt')

const password = {

    async encryptPassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (error, hashPassword) => {
                if (error) {
                    reject({
                        message: 'Error encrypting password!',
                        error,
                        password
                    })
                } else {
                    resolve({
                        message: 'Password encrypted!',
                        password: hashPassword
                    })
                }
            })
        })
    },

    async decryptPassword(plainPassword, hash) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(plainPassword, hash, (hashError, password) => {
                if (hashError) {
                    reject({
                        message: 'Password decryption error!',
                        error: hashError,
                        password
                    })
                } else {
                    resolve({
                        message: 'Password decrypted!',
                        password
                    })
                }
            })
        })
    }
}

module.exports = password
