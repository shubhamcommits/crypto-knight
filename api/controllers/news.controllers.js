const { NewsService } = require('../services')

const NewsControllers = {
    async createNews(req, res, next){
        // console.log(req.file)
        try {
            let filename= 'xyz';
            // Fetch the data from the body
            // let { news } = req.body
            console.log('hello',req.body)
            if(req.files){
                filename  = req.files.image.name
            }else{
                filename = 'testing'
            }
            

            // call the get user function
            NewsService.createNews(req.body, filename)
                .then((data) => {
                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'News has been created successfully!',
                        news: data
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

    async getNews(req, res, next) {
        try {

            // Fetch the data from the params
            // let { userId } = req.params

            // call the get user function
            NewsService.getNews()
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'News has been fetched successfully!',
                        news: data
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

    async getFilteredNews(req, res, next) {
        console.log('reached')
        try {

            // Fetch the data from the params
            // let { coini } = req.params
            console.log(req.query)

            // call the get user function
            NewsService.getFilteredNews(req.query)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'News has been fetched successfully!',
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

module.exports = NewsControllers