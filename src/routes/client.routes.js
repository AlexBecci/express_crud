const { Router } = require('express')
const { pool } = require('../database/db')
const router = Router()
const { getClient, createClient } = require('../controller/client.controller.js')

router.get('/clients', getClient)

router.post('/clients', createClient)

module.exports = router
