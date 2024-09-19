const { pool } = require("../database/db");

async function getUsersService(req, res) {
    /* res.send('Obteniendo todos los clientes') */
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        console.log(rows)
        res.json(rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error en la consulta a la base de datos" })
    }
}

async function getUserById(id) {
    try {
        const [row] = await pool.query('SELECT * FROM users WHERE id = ?', [id])
        return row
    } catch (error) {
        console.error("Error en la consulta a la base de datos: ", error);
        throw new Error("Error en la consulta a la base de datos");
    }
}

async function getUserByUsername(username) {
    try {
        const [row] = await pool.query('SELECT * FROM users WHERE username =?', [username])
        return row  
    } catch (error) {
        console.error("Error en la consulta a la base de datos: ", error);
        throw new Error("Error en la consulta a la base de datos");
    }
}

async function createUserService(username, password, first_name, last_name) {
    try {
        const result = await pool.query('INSERT INTO users (username,password,first_name,last_name) VALUES (?,?,?,?)', [username, password, first_name, last_name])
        return { id: result.insertId, message: 'Usuario  creado con exito' }

    } catch (error) {
        console.error("Error en la consulta a la base de datos: ", error);
        throw new Error("Error en la consulta a la base de datos");
    }
}

module.exports = { createUserService, getUserByUsername, getUserById, getUsersService }



