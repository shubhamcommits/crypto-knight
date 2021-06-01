const { User } = require('../models')

const UserService = {

    async getUser(userId) {
        return new Promise(async (resolve, reject) => {
            try {

                // Find the User
                const user = await User.findOne({
                    _id: userId
                })
                .populate('triggers', '_id name coin price condition notified')

                // Resolve the promise
                resolve(user)

            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    },

    async getAllUser() {
        return new Promise(async (resolve, reject) => {
            try {

                // Find the User
                const user = await User.find()
                .populate('triggers', '_id name coin price condition notified')

                // Resolve the promise
                resolve(user)

            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    },
    async updateUser(userId, userData) {
        return new Promise(async (resolve, reject) => {
            try {

                // Update the User Data
                const user = await User.findByIdAndUpdate({
                    _id: userId
                }, {
                    $set: userData
                }, {
                    new: true
                })

                // Resolve the promise
                resolve(user)

            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    }
}

module.exports = UserService