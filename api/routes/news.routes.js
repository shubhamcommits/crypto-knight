const express = require('express')
const router = express.Router()

const { NewsControllers } = require('../controllers')

router.post('/', NewsControllers.createNews)
router.get('/', NewsControllers.getNews)

module.exports = router