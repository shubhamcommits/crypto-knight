const { TipsService } = require('../services')

const TipsControllers = {
    async createTips(req, res, next){
        // console.log(req.file)
        try {
            let filename= 'xyz';
            // Fetch the data from the body
            // let { tips } = req.body
            console.log('hello',req.body)
            if(req.files){
                filename  = req.files.image.name
            }else{
                filename = 'testing'
            }
            

            // call the get user function
            TipsService.createTips(req.body, filename)
                .then((data) => {
                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'Tips has been created successfully!',
                        tips: data
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

    async getTips(req, res, next) {
        try {

            // Fetch the data from the params
            // let { userId } = req.params

            // call the get user function
            TipsService.getTips()
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'Tips has been fetched successfully!',
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
    },

    async getFilteredTips(req, res, next) {
        console.log('reached')
        try {

            // Fetch the data from the params
            // let { coini } = req.params
            console.log(req.query)

            // call the get user function
            TipsService.getFilteredTips(req.query)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'Tips has been fetched successfully!',
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

module.exports = TipsControllers