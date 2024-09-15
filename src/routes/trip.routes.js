const { Router } = require('express')
const { getTrips, createTrip, updateTrip, deleteTrip } = require('../controller/trip.controller')

const router = Router()

router.get('/trips', getTrips)

//post
router.post('/trips', createTrip)

//put
router.put('/trips/:id', updateTrip)

//delete
router.delete('/trips/:id', deleteTrip)

module.exports = router