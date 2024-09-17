const { pool } = require('../database/db')


async function getTripsService(req, res) {
    try {
        const [rows] = await pool.query('SELECT * FROM trips ORDER by start_time DESC')
        res.json(rows)
    } catch (error) {
        res.status(500).json({ message: 'Error en la consulta a la base de datos' })
    }
}

//getTripById
async function getTripById(id) {
    try {
        const [rows] = await pool.query('SELECT id FROM  trips WHERE id=?', [id])
        return rows
    } catch (error) {
        console.error("Error en la consulta a la base de datos: ", error);
        throw new Error("Error en la consulta a la base de datos");
    }
}

//create trip
async function createTripService(client_id, vehicle_id, start_time, distance, fare) {
    try {
        const result = await pool.query('INSERT INTO trips (client_id,vehicle_id,start_time,distance,fare) VALUES (?,?,?,?,?)', [client_id, vehicle_id, start_time, distance, fare])
        //retornar el resultado para el controllador
        return result
    } catch (error) {
            console.error("Error en la consulta a la base de datos: ", error);
        throw new Error("Error en la consulta a la base de datos");
    }
}

//update trip
async function updateTripService(id, end_time, distance, fare) {
    try {
        const [result] = await pool.query('UPDATE trips SET end_time=?,distance=?,fare=? WHERE id=?', [end_time, distance, fare, id])
        return result
    } catch (error) {
        console.error("Error en la consulta a la base de datos: ", error);
        throw new Error("Error en la consulta a la base de datos");
    }
}

//delete trip
async function deleteTripService(id) {
    try {
        const [row] = await pool.query(`DELETE FROM trips WHERE id=${id}`)
        return row
    } catch (error) {
        console.error("Error en la consulta a la base de datos: ", error);
        throw new Error("Error en la consulta a la base de datos");
    }
}
module.exports = { createTripService, getTripById, getTripsService, updateTripService, deleteTripService }