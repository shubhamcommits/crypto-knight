const { AuthService } = require('../services')
const { SNS } = require('../../utils')

const AuthControllers = {
    async signIn(req, res, next) {
        try {

            // Fetch the data from the request body
            let { email, password } = req.body

            // call the signIn function
            AuthService.signIn(email, password)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'User signed In Successfully!',
                        user: data.user,
                        token: data.token
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

    async sendMessage(req, res, next) {
        try {

            // Fetch the data from the request body
            const { phoneNumber, subject, message } = req.body

            // Call the send message function
            SNS.sendSms(phoneNumber, subject, message)

            // Send Status 200 response
            return res.status(200).json({
                message: 'Message processed from the server',
            })

        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error!',
                error: error
            })
        }
    },

    async signUp(req, res, next) {
        try {

            // Fetch the data from the request body
            const { user } = req.body

            // Call the signUp function
            AuthService.signUp(user)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'User signed up successfully!',
                        user: data.user,
                        token: data.token
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

module.exports = AuthControllers