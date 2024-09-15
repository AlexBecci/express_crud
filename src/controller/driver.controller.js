const { pool } = require("../database/db");
const { getDriversService, getDriverByEmail, createDriverService, updateDriverService, getDriverById, deleteDriverService } = require("../service/driver.service");

//get drivers
const getDrivers = async (req, res) => {
    const result = await getDriversService(req, res)
    return result
}

//crear driver
const createDriver = async (req, res) => {
    console.log(req.body)
    //obtener los datos del body de la solicitud
    const driverFound = await getDriverByEmail(req.body.email)
    console.log(driverFound)

    if (driverFound.length > 0) {
        console.log('DRIVER  ENCONTRADO, cambie de email')
        return res.status(409).json({
            message: "El Email ingresado ya esta en uso"
        })
    }
    const { first_name, last_name, license_number, phone_number, email } = req.body
    if (!first_name || !last_name || license_number === undefined || phone_number === undefined || !email) {
        return res.status(400).json({
            message: "TODOS LOS CAMPOS (first_name, last_name,license_number, phone_number,email) SON REQUERIDOS"
        })
    }
    try {
        //ejectuar la consulta en la base 
        const result = await createDriverService(first_name, last_name, license_number, phone_number, email)
        //return res exitosa
        res.status(201).json(result)

    } catch (error) {
        console.error("Error en la creacion del driver: ", error)
        res.status(500).json({ message: "Error en la creacion del driver en la base de datos" })
    }
}

//update driver
const updateDriver = async (req, res) => {
    console.log(req.body, req.params)
    const driverId = parseInt(req.params.id, 10)//obtener el id del driver por url
    const { first_name, last_name, license_number, phone_number, email } = req.body//obtener el body del json enviado en el body de la consulta
    if (!first_name || !last_name || license_number === undefined || phone_number === undefined || !email) {
        return res.status(400).json({
            message: "Hay campos incompletos"
        })
    }

    try {
        //llamamos al servicio para actualizar el driver
        const result = await updateDriverService(driverId, first_name, last_name, license_number, phone_number, email)

        if (result.affectedRows === 0) {
            return res.status(400).json({
                message: "Driver no encontrado"
            })
        }
        //enviar respuesta exitosa
        res.status(200).json({ message: "Driver actualizado con exito" })
    } catch (error) {
        console.error('Error en la actualizacion del Driver', error)
        res.status(500).json({
            message: "Error en la actualizacion del driver"
        })
    }
}

//delete driver
const deleteDriver = async (req, res) => {
    const id = parseInt(req.params.id)
    const driverFound = await getDriverById(id)
    if (driverFound.length === 0) {
        console.log('vacio')
        return res.status(404).json({
            message: "No se encontro un driver con ese id, no se puede eliminar"
        })
    }
    try {
        //hacemos la consulta al servicio que maneja la eliminacion del driver
        const result = await deleteDriverService(id)
        //enviar respuesta exitosa
        res.status(204).json(result)
    } catch (error) {
        console.error('Error al eliminar un Driver', error)
        res.status(500).json({ message: "Error en la eliminacion del driver en la base de datos" })
    }
}

module.exports = { getDrivers, createDriver, updateDriver, deleteDriver }

