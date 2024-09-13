const { pool } = require("../database/db");

const getClient = async (req, res) => {
    /* res.send('Obteniendo todos los clientes') */
    try {
        const [rows] = await pool.query('SELECT * FROM clients');
        res.json(rows)
    } catch (error) {
        res.status(500).json({ message: "Error en la consulta a la base de datos" })
    }
}



const createClient = async (req, res) => {
    //obtener los datos del body de la solicitud
    const { first_name, last_name, age } = req.body
    //validamos que se hayan enviado todos los campos requeridos
    if (!first_name || !last_name || age === undefined) {
        return res.status(400).json({
            message: "TODOS LOS CAMPOS (firs_name, last_name, age) SON REQUERIDOS"
        })
    }
    try {
        //ejecutar la consulta para insertar los datos
        //aca entraria el servicio
        const [result] = await pool.query(
            'INSERT INTO clients (first_name, last_name, age) VALUES (?,?,?)',
            [first_name, last_name, age]
        )
        //enviar respuesta exitosa con el id del nuevo cliente
        res.status(201).json({ id: result.insertId, message: "Cliente creado con exito" })
    } catch (error) {
        console.error("Error en la creacion del cliente: ", error)
        res.status(500).json({ message: "Error en la creacion de client en la base de datos" })
    }
}

module.exports = { getClient,createClient }
