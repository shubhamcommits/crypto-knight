const { UserService } = require('../services')

const UserControllers = {
    async getUser(req, res, next) {
        try {

            // Fetch the data from the params
            let { userId } = req.params

            // call the get user function
            UserService.getUser(userId)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'User detail has been fetched successfully!',
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

    async getAllUser(req, res, next) {
        try {

            // Fetch the data from the params
            // let { userId } = req.params

            // call the get user function
            UserService.getAllUser()
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'User detail has been fetched successfully!',
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

    async updateUser(req, res, next) {
        try {

            // Fetch the data from the params
            let { userId } = req.params

            // Fetch the data from the body
            let { user } = req.body

            // call the update user function
            UserService.updateUser(userId, user)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'User detail has been updated successfully!',
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
}

module.exports = UserControllers