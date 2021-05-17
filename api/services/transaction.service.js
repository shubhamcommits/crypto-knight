const { User, Transaction } = require('../models')

const TransactionService = {

    async createTransaction(transactionData) {

        return new Promise(async (resolve, reject) => {
            try {

                // Create a new user
                let user = await User.findById(transactionData.user)

                // Prepare the transaction data
                let transaction = {
                    coinid: transactionData.coinid,
                    _user: transactionData.user,
                    price: transactionData.price,
                    quantity: transactionData.quantity,
                    totalinvestment: (transactionData.price*transactionData.quantity),
                    transaction_date: transactionData.transaction_date
                }

                // Create the new transaction
                transaction = await Transaction.create(transaction)

                // Push the transaction object to the current user
                user.transaction.push(transaction)

                // Save the user object
                user = await User.findByIdAndUpdate(
                    { _id: transactionData.user },
                    { $push: { transaction: transaction } },
                    { new: true }
                )
                .populate('transaction', '_id coinid price quantity totalinvestment transaction_date')

                // Resolve the user
                resolve(user)

            } catch (error) {
                // Catch the error and reject the promise
                reject({ error: error })
            }
        })

    },
    async getTransaction(userId) {
        return new Promise(async (resolve, reject) => {
            try {

                // Find the User
                const transaction = await Transaction.find({
                    _user: userId
                })
                .populate('transaction', 'coinid price quantity totalinvestment transaction_date')

                // Resolve the promise
                resolve(transaction)
            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    }
}


module.exports = TransactionService