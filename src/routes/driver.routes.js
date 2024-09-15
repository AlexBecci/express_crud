const { Router } = require('express')

const router = Router()
const { getDrivers,createDriver } = require('../controller/driver.controller')


//ruta get
router.get('/drivers', getDrivers)

//post
router.post('/drivers',createDriver)

module.exports = router