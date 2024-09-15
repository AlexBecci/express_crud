const { Router } = require('express')

const router = Router()
const { getDrivers } = require('../controller/driver.controller')


//ruta get
router.get('/drivers', getDrivers)

module.exports = router