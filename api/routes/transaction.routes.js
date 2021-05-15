const express = require('express')
const router = express.Router()

const { TransactionControllers } = require('../controllers')

router.post('/', TransactionControllers.createTransaction)
router.get('/:userId', TransactionControllers.getTransaction)

module.exports = router