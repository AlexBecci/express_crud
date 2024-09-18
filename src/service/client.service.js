const { pool } = require("../database/db");

const getClientService = async (req, res) => {
    /* res.send('Obteniendo todos los clientes') */
    console.log('q pasa aca?')
    try {
        const [rows] = await pool.query('SELECT * FROM clients');
        console.log(rows)
        res.json(rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error en la consulta a la base de datos" })
    }
}
//get by id

const getClientById = async (id) => {
    try {
        const [row] = await pool.query('SELECT * FROM clients WHERE id = ?', [id])
        return row
    } catch (error) {
        console.error("Error en la consulta a la base de datos: ", error);
        throw new Error("Error en la consulta a la base de datos");
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
async function updateClientService(id, first_name, last_name, phone_number, email) {
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
//delete client
const deleteClientService = async (id) => {
    try {
        //Ejecutar la consulta 
        const [row] = await pool.query(`DELETE FROM clients WHERE id = ${id}`)
        console.log(row)
        return row
    } catch (error) {
        console.error("Error al eliminar el cliente ", error)
        throw error
    }
}



module.exports = { getClientService, createClientService, getClientByName, updateClientService, deleteClientService, getClientById }