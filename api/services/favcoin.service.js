const { User, Favcoin } = require('../models')

const FavcoinService = {

    async createFavcoin(favcoinData) {

        return new Promise(async (resolve, reject) => {
            try {

                // Create a new user
                let user = await User.findById(favcoinData.user)

                // Prepare the favcoin data
                let favcoin = {
                    name: favcoinData.name,
                    _user: favcoinData.user,
                    coinid: favcoinData.coinid,
                }

                // Create the new favcoin
                favcoin = await Favcoin.create(favcoin)

                // Push the favcoin object to the current user
                user.favcoin.push(favcoin)

                // Save the user object
                user = await User.findByIdAndUpdate(
                    { _id: favcoinData.user },
                    { $push: { favcoin: favcoin } },
                    { new: true }
                )
                .populate('favcoin', '_id name coinid')

                // Resolve the user
                resolve(user)

            } catch (error) {
                // Catch the error and reject the promise
                reject({ error: error })
            }
        })

    }
}


module.exports = FavcoinService