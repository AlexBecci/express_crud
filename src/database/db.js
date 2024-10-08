/* const mysql = require('mysql2/promise')
const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } = require('../config')
//configuracion de la conexion a la base de 

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_DATABASE
    
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

module.exports = { pool, testConnection } */
const mysql = require('mysql2/promise');
const { MYSQL_URL } = require('../config'); // Tomar directamente la URL de la configuración

// Configuración de la conexión a la base de datos usando MYSQL_URL
const pool = mysql.createPool(MYSQL_URL);

// Función para probar la conexión
async function testConnection() {
    try {
        const [rows] = await pool.query('SELECT 1');
        console.log('CONEXIÓN A LA BASE DE DATOS ESTABLECIDA CORRECTAMENTE');
        return rows;
    } catch (error) {
        console.error('Error conectando a la base de datos', error.stack);
        throw error;
    }
}

module.exports = { pool, testConnection };