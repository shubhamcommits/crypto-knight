const { PortfolioService, TransactionService } = require('../services')

const PortfolioControllers = {
    
    async createPortfolio(req, res, next){
        try {

            // Fetch the data from the body
            let { portfolio } = req.body

            // call the get user function
            PortfolioService.createPortfolio(portfolio)
                .then((data) => {
                    TransactionService.createTransaction(portfolio)
                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'Portfolio has been created successfully!',
                        portfolio: data
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
    async getPortfolio(req, res, next) {
        try {

            // Fetch the data from the params
            let { userId } = req.params

            // call the get user function
            PortfolioService.getPortfolio(userId)
                .then((data) => {
                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'User portfolio has been fetched successfully!',
                        portfolio: data
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
    async getPortfolioValue(req, res, next) {
        try {

            // Fetch the data from the params
            let { userId } = req.params

            // call the get user function
            PortfolioService.getPortfolioValue(userId)
                .then((data) => {
                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'User portfolio value has been fetched successfully!',
                        portfolio: data
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
    async getPortfolioDetail(req, res, next) {
        try {
            console.log('oinside contoller')
            // Fetch the data from the params
            let { coinId } = req.params

            // call the get user function
            PortfolioService.getPortfolioDetail(coinId)
                .then((data) => {
                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'User portfolio value has been fetched successfully!',
                        portfolio: data
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

module.exports = PortfolioControllers