const { Router } = require('express')
const router = Router()
const { createClient, getClient, updateClient, deleteClient } = require('../controller/client.controller.js')
const { authenticateToken } = require('../controller/auth.controller.js')

router.get('/clients', authenticateToken, getClient)

router.post('/clients', createClient)

router.put('/clients/:id', updateClient)

router.delete('/clients/:id', deleteClient)

module.exports = router
