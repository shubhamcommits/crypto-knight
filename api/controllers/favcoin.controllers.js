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
    }
}

module.exports = FavcoinControllers