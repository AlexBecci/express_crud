require('dotenv').config();
const mysql = require('mysql2/promise')

//configuracion de la conexion a la base de 
console.log('DB_USER:', process.env.DB_USER);

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    /* waitForConnections:true, */
})

//conecta a la base de datos
//funcion

async function testConnection() {
    try {
        const [rows] = await pool.query('SELECT 1');
        console.log('CONEXION A L ABASE DE DATOS ESTABLECIDA CORRECTAMENTE')
        return rows
    } catch (error) {
        console.error('Error conectando la base de datos', error.stack)
        throw error
    }
}

module.exports = { pool, testConnection }