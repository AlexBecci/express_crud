const mysql = require('mysql2/promise')

//configuracion de la conexion a la base de datos
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'test',
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