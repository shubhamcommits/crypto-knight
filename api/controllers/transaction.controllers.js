const { TransactionService } = require('../services')

const TransactionControllers = {
    async createTransaction(req, res, next){
        try {

            // Fetch the data from the body
            let { transaction } = req.body

            // call the get user function
            TransactionService.createTransaction(transaction)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'Transaction has been created successfully!',
                        transaction: data
                    })
                })
                .catch((error) => {
                    return res.status(500).json({
                        message: 'Internal server error!',
                        error: error
                    })
                })
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error!',
                error: error
            })
        }
    },
    async getTransaction(req, res, next) {
        try {

            // Fetch the data from the params
            let { userId } = req.params

            // call the get user function
            TransactionService.getTransaction(userId)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'User transaction has been fetched successfully!',
                        user: data
                    })
                })
                .catch((error) => {
                    return res.status(500).json({
                        message: 'Internal server error!',
                        error: error
                    })
                })
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error!',
                error: error
            })
        }
    }
}

module.exports = TransactionControllers