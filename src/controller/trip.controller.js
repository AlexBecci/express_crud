const { getTripsService, createTripService, updateTripService, getTripById, deleteTripService } = require("../service/trip.service")
const { SECRET_KEY } = require('../config')
const jwt = require('jsonwebtoken')

//get trip
async function getTrips(req, res) {
    const result = await getTripsService(req, res)
    return result
}


//create trip
async function createTrip(req, res) {
    const { client_id, vehicle_id, start_time, distance, fare, driver_id } = req.body
    console.log(req.body)
    if (client_id === undefined || vehicle_id === undefined || !start_time || distance === undefined || fare === undefined || driver_id === undefined) {
        return res.status(400).json({
            message: "TODOS LOS CAMPOS (client_id, vehicle_id,start_time,distance,fare) SON REQUERIDOS"
        })
    }
    try {
        // Obtener el token desde la cookie
        const token = req.cookies.authToken;
        console.log(token)
        if (!token) {
            return res.status(401).json({ message: "No está autenticado" });
        }
        // Decodificar el token para obtener el user_id
        const decoded = jwt.verify(token, SECRET_KEY); // Reemplaza 'process.env.SECRET_KEY' con tu clave secreta
        const user_id = decoded.id;
        const result = await createTripService(client_id, vehicle_id, start_time, distance, fare, driver_id, user_id)
        //respuesta exitosa
        res.status(201).json({ message: `Viaje creado con exito` })
    } catch (error) {
        console.error("Error en la creacion del viaje: ", error)
        res.status(500).json({ message: "Error en la creacion del viaje en la base de datos" })
    }
}

async function updateTrip(req, res) {
    const tripId = parseInt(req.params.id, 10)
    const { end_time, distance, fare } = req.body
    if (!end_time || distance === undefined || fare === undefined) {
        return res.status(400).json({
            message: "TODOS LOS CAMPOS (client_id, vehicle_id,start_time,distance,fare) SON REQUERIDOS"
        })
    }
    try {
        const result = await updateTripService(tripId, end_time, distance, fare)
        if (result.affectedRows === 0) {
            return res.status(400).json({
                message: "viaje no encontrado"
            })
        }
        //enviar respuesta exitosa
        res.status(200).json({ message: "Viaje Actualizado con exito" })
    } catch (error) {
        console.error('Error en la actualizacion del viaje', error)
        res.status(500).json({
            message: "Error en la actualizacion del viaje"
        })
    }
}
async function deleteTrip(req, res) {
    const id = parseInt(req.params.id)
    const tripFound = await getTripById(id)
    if (tripFound.length === 0) {
        return res.status(404).json({
            message: "No se encontro un viaje con ese id, no se puede eliminar"
        })
    }
    try {
        const result = await deleteTripService(id)
        //enviar repsuesta correcta
        res.status(204).json(result)
    } catch (error) {
        console.error('Error al eliminar un viaje', error)
        res.status(500).json({ message: "Error en la eliminacion del viaje en la base de datos" })
    }
}

module.exports = { getTrips, createTrip, updateTrip, deleteTrip }