const { Router } = require('express')
const { pool } = require('../database/db')
const router = Router()
const { createClient, getClient, updateClient } = require('../controller/client.controller.js')

router.get('/clients', getClient)

router.post('/clients', createClient)

router.put('/clients/:id', updateClient)

module.exports = router
