const { createClientService, getClientByName, getClientService, updateClientService, getClientById, deleteClientService } = require("../service/client.service");

const getClient = async (req, res) => {
    console.log()
    const result = getClientService(req, res)
    return result
}

const createClient = async (req, res) => {
    console.log(req.body)
    //obtener los datos del body de la solicitud
    const clientFound = await getClientByName(req.body.email)
    console.log(clientFound)

    if (clientFound.length > 0) {
        console.log('CLIENTE  ENCONTRADO, cambie de email')
        return res.status(409).json({
            message: "El Email ingresado ya esta en uso"
        })
    }
    const { first_name, last_name, phone_number, email } = req.body
    //validamos que se hayan enviado todos los campos requeridos
    if (!first_name || !last_name || phone_number === undefined || !email) {
        return res.status(400).json({
            message: "TODOS LOS CAMPOS (first_name, last_name, phone_number,email) SON REQUERIDOS"
        })
    }
    try {
        //ejecutar la consulta para insertar los datos
        //aca entraria el servicio
        const result = await createClientService(first_name, last_name, phone_number, email)
        // Enviar respuesta exitosa con el id del nuevo cliente
        res.status(201).json(result);

    } catch (error) {
        console.error("Error en la creacion del cliente: ", error)
        res.status(500).json({ message: "Error en la creacion de client en la base de datos" })
    }
}

//funcion para manejar la solicitud de actualizacion de un cliente
const updateClient = async (req, res) => {
    console.log(req.body, req.params)
    const clientId = parseInt(req.params.id, 10)//obtener el id del cliente por url
    const { first_name, last_name, phone_number, email } = req.body//obtener el body del json enviado en el body de la consulta
    //validar que se enviaron los campos solicitados
    if (!first_name || !last_name || phone_number === undefined || !email) {
        return res.status(400).json({
            message: "Hay campos incompletos"
        })
    }
    try {
        //llamamos al servicio para actualizar el cliente
        const result = await updateClientService(clientId, first_name, last_name, phone_number, email)

        console.log(`result--> ${result}`)

        if (result.affectedRows === 0) {
            return res.status(400).json({
                message: "Cliente no encontrado"
            })
        }
        //Enviar respuesta exitosa 
        res.status(200).json({
            message: "Cliente Actualizado con exito"
        })
    } catch (error) {
        console.error('Error en la actualizacion del cliente', error)
        res.status(500).json({
            message: "Error en la actualizacion del cliente"
        })
    }
}
//delete client
const deleteClient = async (req, res) => {
    const id = parseInt(req.params.id)
    const clientFound = await getClientById(id)
    console.log(clientFound)
    if (clientFound.length === 0) {
        console.log('vacio')
        return res.status(404).json({
            message: "No se encontro un cliente con ese id, no se puede eliminar"
        })
    }
    try {
        //hacemos la consulta para eliminar un cliente
        const result = await deleteClientService(id)
        //enviar respuesta exitosa
        res.status(204).json(result)
    } catch (error) {
        console.error('Error al eliminar un cliente', error)
        res.status(500).json({ message: "Error en la eliminacion de client en la base de datos" })
    }
}

module.exports = { createClient, getClient, updateClient, deleteClient }
