const { User, Trigger } = require('../models')

const TriggerService = {

    async createTrigger(triggerData) {

        return new Promise(async (resolve, reject) => {
            try {

                // Create a new user
                let user = await User.findById(triggerData.user)

                // Prepare the trigger data
                let trigger = {
                    name: triggerData.name,
                    _user: triggerData.user,
                    coin: triggerData.coin,
                    price: triggerData.price,
                    condition: triggerData.condition
                }

                // Create the new trigger
                trigger = await Trigger.create(trigger)

                // Push the trigger object to the current user
                user.triggers.push(trigger)

                // Save the user object
                user = await User.findByIdAndUpdate(
                    { _id: triggerData.user },
                    { $push: { triggers: trigger } },
                    { new: true }
                )
                .populate('triggers', '_id name coin price condition notified')

                // Resolve the user
                resolve(user)

            } catch (error) {
                // Catch the error and reject the promise
                reject({ error: error })
            }
        })

    },
    async getTrigger(userId) {
        return new Promise(async (resolve, reject) => {
            try {

                // Find the User
                const trigger = await Trigger.find({
                    _user: userId
                })
                .populate('trigger', 'name coin price condition notified created_date')

                // Resolve the promise
                resolve(trigger)
            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    }
}


module.exports = TriggerService