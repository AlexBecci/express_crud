const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
//importamos la conexion a la  base de datos
const { testConnection } = require('./database/db')

//llamando a las routes
const ClientRoutes = require('./routes/client.routes')
const DriverRoutes = require('./routes/driver.routes')
const VehicleRoutes = require('./routes/vehicle.routes')
const TripRoutes = require('./routes/trip.routes')
const PaymentRoutes = require('./routes/payment.routes')
//cors modificado
const corsOptions = {
    /*  origin: process.env.PORT_FRONT, */  // Permite solicitudes solo desde este origen
    origin: 'http://localhost:5173',  // Especifica directamente la URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas,
    credentials: true, // Permitir cookies y credenciales
}
//settings

//middlewares
app.use(express.json())
app.use(morgan('dev'))
// Configuración de CORS

app.use(cors(corsOptions))  // Usa el middleware cors
//routes
/* app.use(ClientRoutes, DriverRoutes, VehicleRoutes, TripRoutes, PaymentRoutes)
 */
// Montar rutas con el prefijo /api
app.use('/api', ClientRoutes)
app.use('/api', DriverRoutes)
app.use('/api', VehicleRoutes)
app.use('/api', TripRoutes)
app.use('/api', PaymentRoutes)

startServer()

//publics

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