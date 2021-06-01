const keys = require('../keys')

const FileHandler = {

    async uploadFile(req, res, next) {

        if (req.hasOwnProperty('files')) {

            if (req['files'].hasOwnProperty('image')) {
                const file = req['files']['image']

                // Get the folder link from the environment
                let folder = keys.FILE_UPLOADS_FOLDER

                let fileName = ''

                fileName += Date.now().toString() + '_' + req['files'].image['name']
                
                req['files']['image']['name'] = fileName
                // Modify the file accordingly and handle request
                file.mv(folder + fileName, (error) => {
                    if (error) {
                        fileName = null
                        return res.status(500).json({
                            status: '500',
                            message: 'file upload error',
                            error: error
                        })
                    }

                    // Modify the current request to add fileName
                    req['fileName'] = fileName
                })
            }

        }

        // Pass the middleware
        next()
    }

}

module.exports = FileHandler