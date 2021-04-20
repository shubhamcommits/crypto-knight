const jwt = require('jsonwebtoken')
const { Auth, User } = require('../models')
const { Password } = require('../../utils')

const AuthService = {
    async createAuthLog(token, userId) {
        return new Promise(async (resolve, reject) => {
            try {

                // Authentication logs schema
                const authLog = {
                    token: token,
                    _user: userId
                }

                // Create the auth logs
                const auth = await Auth.create(authLog)

                // Resolve the promise
                resolve(auth)

            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    },

    async signIn(email, password) {
        return new Promise(async (resolve, reject) => {
            try {

                // Check if user exists in the DB 
                const user = await User.findOne({ email })

                // If user wasn't found or user was previously removed/disabled, return error
                if (!user || user.active === false) {
                    reject({ error: 'Either user doesn\'t exist or was removed from the system.' })
                }

                // Decrypt the Password
                const decryptedPassword = await Password.decryptPassword(password, user.password)

                // If the password is wrong
                if (!decryptedPassword.password) {
                    reject({ error: 'Please enter a valid email or password!' })
                }

                // Create the signed token
                const token = jwt.sign(user.toJSON(), process.env.JWT_KEY)

                // Log the auths
                this.createAuthLog(token, user._id)

                // Resolve the promise
                resolve({
                    user: user,
                    token: token
                })

            } catch (error) {

                // Catch the error and reject the promise
                reject(error)
            }
        })
    },

    async signUp(userData) {
        return new Promise(async (resolve, reject) => {
            try {

                // Check if user exists in the DB 
                const checkUser = await User.findOne({ email: userData.email })

                if(checkUser){
                    reject({ error: 'User with this email already exist.' })
                }

                // Encrypting user password
                const encryptedPass = await Password.encryptPassword(userData.password)

                // If the password is wrong
                if (!encryptedPass.password) {
                    reject({ error: 'Please choose a different password.' })
                }

                // User Data
                let data = {
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    full_name: userData.first_name + userData.last_name,
                    email: userData.email,
                    password: encryptedPass.password
                }

                // Create the new User
                let user = await User.create(data)

                // If user is not created
                if (!user) {
                    reject({ error: 'User was not created.' })
                }

                // Sign In the current user
                let res = await this.signIn(userData.email, userData.password)

                // Resolve the promise
                resolve({
                    user: res.user,
                    token: res.token
                })


            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    }
}

module.exports = AuthService