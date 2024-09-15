const { Router } = require('express')

const router = Router()
const { getDrivers, createDriver, updateDriver, deleteDriver } = require('../controller/driver.controller')


//ruta get
router.get('/drivers', getDrivers)

//post
router.post('/drivers', createDriver)

//update
router.put('/drivers/:id', updateDriver)

//delete
router.delete('/drivers/:id', deleteDriver)

module.exports = router