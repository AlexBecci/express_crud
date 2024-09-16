const { getVehiclesService, getVehicleByLicensePlate, createVehicleService, updateVehicleService, getVehicleById, deleteVehicleService } = require('../service/vehicle.service')
//get vehicles
async function getVehicles(req, res) {
    const result = await getVehiclesService(req, res)
    return result
}

//create vehicle
async function createVehicle(req, res) {
    console.log(req.body)
    const vehicleFound = await getVehicleByLicensePlate(req.body.license_plate)
    if (vehicleFound.length > 0) {
        return res.status(409).json({ message: "EL valor de la patente ya esta en uso" })
    }
    /* license_plate, model, make, year, drive_id */
    const { license_plate, model, make, year, driver_id } = req.body
    if (!license_plate || !model || !make || year === undefined || driver_id === undefined) {
        return res.status(400).json({
            message: "TODOS LOS CAMPOS (license_plate, model,make, year,driver_id) SON REQUERIDOS"
        })
    }
    try {
        const result = await createVehicleService(license_plate, model, make, year, driver_id)
        console.log(result)
        //return exitosa
        res.status(201).json({ message: `Vehiculo creado con exito` })
    } catch (error) {
        console.error("Error en la creacion del vehiculo: ", error)
        res.status(500).json({ message: "Error en la creacion del vehiculo en la base de datos" })
    }
}


//update vehicle
async function updateVehicle(req, res) {
    console.log(req.body, req.params)
    const vehicleId = parseInt(req.params.id, 10)//obtener el id del driver por 
    /* license_plate, model, make, year, drive_id */
    const { model, make, year } = req.body
    if (!model || !make || year === undefined) {
        return res.status(400).json({
            message: "TODOS LOS CAMPOS (model,make, year) SON REQUERIDOS"
        })
    }
    try {
        //llamamos al servicio para actualizar el driver
        const result = await updateVehicleService(vehicleId, model, make, year)
        if (result.affectedRows === 0) {
            return res.status(400).json({
                message: "vehiculo no encontrado"
            })
        }
        //enviar respuesta exitosa
        res.status(200).json({ message: "vehiculo actualizado con exito" })
    } catch (error) {
        console.error('Error en la actualizacion del vehiculo', error)
        res.status(500).json({
            message: "Error en la actualizacion del vehiculo"
        })
    }
}

//delete vehicle
async function deleteVehicle(req, res) {
    console.log(parseInt(req.params.id))
    const id = parseInt(req.params.id)
    const vehicleFound = await getVehicleById(id)
    if (vehicleFound.length === 0) {
        return res.status(404).json({
            message: "No se encontro un vehiculo con ese id, no se puede eliminar"
        })
    }
    try {
        //hacemos la consulta al servicio que maneja la eliminacion del vehiculo
        const result = await deleteVehicleService(id)
        //enviar respuesta exitosa
        res.status(204).json(result)
    } catch (error) {
        console.error('Error al eliminar un vehiculo', error)
        res.status(500).json({ message: "Error en la eliminacion del vehiculo en la base de datos" })
    }

}


module.exports = { getVehicles, createVehicle, updateVehicle, deleteVehicle }