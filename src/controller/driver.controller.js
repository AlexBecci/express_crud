const { pool } = require("../database/db");
const { getDriversService, getDriverByEmail, createDriverService } = require("../service/driver.service");

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
            message: "TODOS LOS CAMPOS (firs_name, last_name,license_number, phone_number,email) SON REQUERIDOS"
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

module.exports = { getDrivers, createDriver }

