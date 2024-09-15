//importamos conexion a la base
const { pool } = require('../database/db')

const getDriversService = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM drivers')
        res.json(rows)
    } catch (error) {
        res.status(500).json({ message: "Error en la consulta a la base de datos" })
    }
}

//traemos el driver por email
const getDriverByEmail = async (email) => {
    try {
        const [rows] = await pool.query("SELECT * FROM drivers WHERE email= ?", [email])
        return rows
    } catch (error) {
        console.error("Error en la consulta a la base de datos: ", error);
        throw new Error("Error en la consulta a la base de datos");
    }
}
//traer driver por id
const getDriverById = async (id) => {
    try {
        const [row] = await pool.query('SELECT * FROM drivers WHERE id = ?', [id])
        return row
    } catch (error) {
        console.error("Error en la consulta a la base de datos: ", error);
        throw new Error("Error en la consulta a la base de datos");
    }
}

//crear un driver/remisero
const createDriverService = async (first_name, last_name, license_number, phone_number, email) => {
    try {
        const result = await pool.query('INSERT INTO drivers (first_name, last_name,license_number, phone_number,email) VALUES (?,?,?,?,?)', [first_name, last_name, license_number, phone_number, email])
        //retornar el resultado para que el controlador pueda  manejar la respuesta
        return result
    } catch (error) {
        console.error("Error en la creacion del driver: ", error)
        res.status(500).json({ message: "Error en la creacion de un driver en la base de datos" })
    }
}

//actualizar un driver
const updateDriverService = async (id, first_name, last_name, license_number, phone_number, email) => {
    try {
        //Ejecutar la consulta de actualizacion
        const [result] = await pool.query(
            'UPDATE drivers SET first_name = ?, last_name = ? ,license_number = ?, phone_number = ?, email = ? WHERE id= ?', [first_name, last_name, license_number, phone_number, email, id]
        )
        //retornar el resultado de la actualizacion
        return result
    } catch (error) {
        console.error("Error en la actualizacion del Driver: ", error)
        throw error
    }
}

//delete client
const deleteDriverService = async (id) => {
    try {
        //Ejecutar la consulta 
        const [row] = await pool.query(`DELETE FROM drivers WHERE id = ${id}`)
        return row
    } catch (error) {
        console.error("Error al eliminar el driver ", error)
        throw error
    }
}

module.exports = { getDriversService, getDriverByEmail, createDriverService, updateDriverService, getDriverById, deleteDriverService }