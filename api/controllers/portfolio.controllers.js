const { PortfolioService } = require('../services')

const PortfolioControllers = {
    async createPortfolio(req, res, next){
        try {

            // Fetch the data from the body
            let { portfolio } = req.body

            // call the get user function
            PortfolioService.createPortfolio(portfolio)
                .then((data) => {

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
    }
}

module.exports = PortfolioControllers