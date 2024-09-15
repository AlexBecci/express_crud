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

//crear un driver/remisero
const createDriverService = async (first_name, last_name, license_number, phone_number, email) => {
    try {
        const result = await pool.query('INSERT INTO drivers (first_name, last_name,license_number, phone_number,email) VALUES (?,?,?,?,?)', [first_name, last_name, license_number, phone_number, email])
        //retornar el resultado para que el controlador pueda  manejar la respuesta
    } catch (error) {
        console.error("Error en la creacion del driver: ", error)
        res.status(500).json({ message: "Error en la creacion de un driver en la base de datos" })
    }
}




module.exports = { getDriversService,getDriverByEmail,createDriverService }