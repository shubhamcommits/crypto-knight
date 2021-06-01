const express = require('express')
const router = express.Router()

const { NewsControllers } = require('../controllers')
const { FileHandler } = require('../../utils')

router.post('/', FileHandler.uploadFile, NewsControllers.createNews)
router.get('/', NewsControllers.getNews)
router.get('/filter', NewsControllers.getFilteredNews)

module.exports = router