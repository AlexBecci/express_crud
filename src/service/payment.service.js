const { pool } = require('../database/db')

async function getPaymentsService(req, res) {
    try {
        const [rows] = await pool.query('SELECT * FROM payments')
        res.json(rows)
    } catch (error) {
        res.status(500).json({ message: 'Error en la consulta a la base de datos' })
    }
}
//get payment by id

async function getPaymentService(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM payments WHERE id=?', [id])
        return rows
    } catch (error) {
        console.error("Error en la consulta a la base de datos: ", error);
        throw new Error("Error en la consulta a la base de datos");
    }
}

async function createPaymentService(trip_id, amount, payment_date, user_id,payment_method) {
    try {
        const result = await pool.query('INSERT INTO payments (trip_id,amount,payment_date,user_id,payment_method) VALUES (?,?,?,?,?)', [trip_id, amount, payment_date, user_id,payment_method])
        return result
    } catch (error) {
        console.error("Error en la consulta a la base de datos: ", error);
        throw new Error("Error en la consulta a la base de datos");
    }
}

async function updatePaymentService(id, trip_id, amount, payment_date) {
    try {
        const [result] = await pool.query('UPDATE payments SET trip_id=?,amount=?,payment_date=? WHERE id =?', [trip_id, amount, payment_date, id])
        return result
    } catch (error) {
        console.error("Error en la consulta a la base de datos: ", error);
        throw new Error("Error en la consulta a la base de datos");
    }
}

async function deletePaymentService(id) {
    try {
        const [row] = await pool.query(`DELETE FROM payments WHERE id =${id}`)
        return row
    } catch (error) {
        console.error("Error en la consulta a la base de datos: ", error);
        throw new Error("Error en la consulta a la base de datos");
    }
}
module.exports = { getPaymentsService, createPaymentService, updatePaymentService, deletePaymentService, getPaymentService }