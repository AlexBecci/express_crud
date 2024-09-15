const express = require('express')
const morgan = require('morgan')
const app = express()

//importamos la conexion a la  base de datos
const { testConnection } = require('./database/db')

//llamando a las routes
const ClientRoutes = require('./routes/client.routes')
const DriverRoutes = require('./routes/driver.routes')
const VehicleRoutes = require('./routes/vehicle.routes')
const TripRoutes = require('./routes/trip.routes')
const PaymentRoutes = require('./routes/payment.routes')

//settings

//middlewares
app.use(express.json())
app.use(morgan('dev'))
//routes
app.use(ClientRoutes, DriverRoutes, VehicleRoutes, TripRoutes, PaymentRoutes)

//publics
startServer()

//probar la conexion y luego levantar el servidor
async function startServer() {
    try {
        //probar la conexion a la base de datos
        await testConnection();
        //si la conexion es exitosa, iniciar el servidor
        app.listen(3000)
        console.log('SERVER ON PORT --->3000')
    } catch (error) {
        //manejar errores de conexion
        console.error("Error en la conexion a la base de datos. No se puede levantar el servidor", error)
    }
}