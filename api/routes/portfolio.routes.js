const express = require('express')
const router = express.Router()

const { PortfolioControllers } = require('../controllers')

router.post('/', PortfolioControllers.createPortfolio)
router.get('/:userId', PortfolioControllers.getPortfolio)

module.exports = router