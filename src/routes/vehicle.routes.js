const { Router } = require('express')
const router = Router()

const { getVehicles, createVehicle, updateVehicle, deleteVehicle } = require('../controller/vehicle.controller.js')

//get 
router.get('/vehicles', getVehicles)

//post
router.post('/vehicles', createVehicle)

//put 
router.put('/vehicles/:id', updateVehicle)

//delte
router.delete('/vehicles/:id', deleteVehicle)



module.exports = router