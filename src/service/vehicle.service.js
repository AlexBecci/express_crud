
const { pool } = require('../database/db')

async function getVehiclesService(req, res) {
    try {
        const [rows] = await pool.query('SELECT * FROM vehicles')
        res.json(rows)
    } catch (error) {
        res.status(500).json({ message: 'Error en la consulta a la base de datos' })
    }
}
//getVehicleById
async function getVehicleById(id) {
    try {
        const [rows] = await pool.query('SELECT id FROM  vehicles WHERE id=?', [id])
        return rows
    } catch (error) {
        console.error("Error en la consulta a la base de datos: ", error);
        throw new Error("Error en la consulta a la base de datos");
    }
}

async function getVehicleByLicensePlate(license_plate) {
    try {
        const [rows] = await pool.query('SELECT * FROM vehicles WHERE license_plate = ?', [license_plate])
        return rows
    } catch (error) {
        console.error("Error en la consulta a la base de datos: ", error);
        throw new Error("Error en la consulta a la base de datos");
    }
}

async function createVehicleService(license_plate, model, make, year, driver_id) {
    try {
        const result = await pool.query('INSERT INTO vehicles (license_plate,model,make,year,driver_id) VALUES (?,?,?,?,?)', [license_plate, model, make, year, driver_id])
        //retorna el resultado para que ell controlador pueda manejar la respuesta
        return result
    } catch (error) {
        console.error("Error en la creacion del vehiculo: ", error)
        res.status(500).json({ message: "Error en la creacion de un vehiculo en la base de datos" })
    }
}

//update vehicle
async function updateVehicleService(id, model, make, year) {
    try {
        //Ejecutar la consulta de actualizacion
        const [result] = await pool.query('UPDATE vehicles SET model=?,make=?,year=? WHERE id=?', [model, make, year, id])
        return result
    } catch (error) {
        console.error("Error en la actualizacion del vehiculo: ", error)
        res.status(500).json({ message: "Error en la actualizacion de un vehiculo en la base de datos" })
    }
}

//delete vehicle
async function deleteVehicleService(id) {
    try {
        const [row] = await pool.query(`DELETE FROM vehicles WHERE id = ${id}`)
        return row
    } catch (error) {
        console.error("Error en la consulta a la base de datos: ", error);
        throw new Error("Error en la consulta a la base de datos");
    }
}


module.exports = { getVehiclesService, createVehicleService, getVehicleByLicensePlate, updateVehicleService, getVehicleById,deleteVehicleService }

