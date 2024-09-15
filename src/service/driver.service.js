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


module.exports={getDriversService}