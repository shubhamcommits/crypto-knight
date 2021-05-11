const { TriggerService } = require('../services')

const TriggerControllers = {
    async createTrigger(req, res, next){
        try {

            // Fetch the data from the body
            let { trigger } = req.body

            // call the get user function
            TriggerService.createTrigger(trigger)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'Trigger has been created successfully!',
                        trigger: data
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

module.exports = TriggerControllers