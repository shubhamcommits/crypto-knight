const { FavcoinService } = require('../services')

const FavcoinControllers = {
    async createFavcoin(req, res, next){
        try {

            // Fetch the data from the body
            let { favcoin } = req.body

            // call the get user function
            FavcoinService.createFavcoin(favcoin)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'Favcoin has been created successfully!',
                        favcoin: data
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
    async getFavcoin(req, res, next) {
        try {

            // Fetch the data from the params
            let { userId } = req.params

            // call the get user function
            FavcoinService.getFavcoin(userId)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'User favourite coins have been fetched successfully!',
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

module.exports = FavcoinControllers