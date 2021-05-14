const express = require('express')
const router = express.Router()

const { PortfolioControllers } = require('../controllers')

router.post('/', PortfolioControllers.createPortfolio)

module.exports = router