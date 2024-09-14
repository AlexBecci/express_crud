const { pool } = require("../database/db");

const getClientService = async (req, res) => {
    /* res.send('Obteniendo todos los clientes') */
    try {
        const [rows] = await pool.query('SELECT * FROM clients');
        res.json(rows)
    } catch (error) {
        res.status(500).json({ message: "Error en la consulta a la base de datos" })
    }
}

const getClientByName = async (email) => {
    try {
        const [row] = await pool.query('SELECT * FROM clients WHERE email = ?', [email])
        return row
    } catch (error) {
        console.error("Error en la consulta a la base de datos: ", error);
        throw new Error("Error en la consulta a la base de datos");
    }
}

const createClientService = async (first_name, last_name, phone_number, email) => {
    try {
        //ejecutar la consulta para insertar los datos
        //aca entraria el servicio
        const result = await pool.query(
            'INSERT INTO clients (first_name, last_name, phone_number,email) VALUES (?,?,?,?)',
            [first_name, last_name, phone_number, email]
        )
        // Retornar el resultado para que el controlador pueda manejar la respuesta
        return { id: result.insertId, message: "Cliente creado con éxito" };
    } catch (error) {
        console.error("Error en la creacion del cliente: ", error)
        res.status(500).json({ message: "Error en la creacion de client en la base de datos" })
    }
}
//update

const updateClientService = async (id, first_name, last_name, phone_number, email) => {
    try {
        //Ejecutar la consulta de actualizacion
        const [result] = await pool.query(
            'UPDATE clients SET first_name = ?, last_name = ?, phone_number = ?, email = ? WHERE id= ?', [first_name, last_name, phone_number, email, id]
        )
        //retornar el resultado de la actualizacion
        return result
    } catch (error) {
        console.error("Error en la actualizacion del cliente: ", error)
        throw error
    }
}



module.exports = { getClientService, createClientService, getClientByName, updateClientService }