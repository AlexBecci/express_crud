const { getPaymentsService, createPaymentService, updatePaymentService, getPaymentService, deletePaymentService } = require("../service/payment.service")


//get vehicles
async function getPayments(req, res) {
    const result = await getPaymentsService(req, res)
    return result
}

//post
async function createPayment(req, res) {
    const { trip_id, amount, payment_date } = req.body
    if (trip_id === undefined || amount === undefined || !payment_date) {
        return res.status(400).json({
            message: "TODOS LOS CAMPOS (trip_id,amount,payment_date) SON REQUERIDOS"
        })
    }
    try {
        await createPaymentService(trip_id, amount, payment_date)
        //return exitosa
        res.status(201).json({ message: `Pago creado con exito ` })
    } catch (error) {
        console.error("Error en la creacion del pago: ", error)
        res.status(500).json({ message: "Error en la creacion del pago en la base de datos" })
    }
}

//update payment
async function updatePayment(req, res) {
    const paymentId = parseInt(req.params.id)
    const { trip_id, amount, payment_date } = req.body
    if (trip_id === undefined || amount === undefined || !payment_date) {
        return res.status(400).json({
            message: "TODOS LOS CAMPOS (trip_id,amount,payment_date) SON REQUERIDOS"
        })
    }
    try {
        //le opegamos al service
        const result = await updatePaymentService(paymentId, trip_id, amount,payment_date)
        if (result.affectedRows === 0) {
            return res.status(400).json({
                message: "Pago no encontrado"
            })
        }
        //enviar respuesta exitosa
        res.status(200).json({ message: "Pago actualizado con exito" })
    } catch (error) {
        console.error('Error en la actualizacion del pago', error)
        res.status(500).json({
            message: "Error en la actualizacion del pago"
        })
    }
}
//delete payment
async function deletePayment(req, res) {
    const paymentId = parseInt(req.params.id)
    const paymentFound = await getPaymentService(paymentId);
    if (paymentFound.length === 0) {
        return res.status(404).json({
            message: "No se encontro un pago con ese id, no se puede eliminar"
        })
    }
    try {
        const result = await deletePaymentService(paymentId)
        res.status(204).json(result)
    } catch (error) {
        console.error('Error al eliminar un pago', error)
        res.status(500).json({ message: "Error en la eliminacion del pago en la base de datos" })
    }
}

module.exports = { getPayments, createPayment, updatePayment, deletePayment }