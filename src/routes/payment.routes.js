
const { Router } = require('express')
const { getPayments, createPayment, updatePayment, deletePayment } = require('../controller/payment.controller')
const router = Router()

//get
router.get('/payments', getPayments)
//post
router.post('/payments', createPayment)

//put
router.put('/payments/:id', updatePayment)

//delete
router.delete('/payments/:id', deletePayment)

module.exports = router
