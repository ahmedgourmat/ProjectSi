const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./DB/activateDb')
const productRoutes = require('./routes/ProductRoutes')
const fournisseurRoutes = require('./routes/FournisseurRoutes')
const clientRoutes = require('./routes/ClientRoutes')
const centerRoutes = require('./routes/CenterRoutes')
const employeeRoutes = require('./routes/EmployeeCenter')
const achatRoutes = require('./routes/AchatRoutes')
const transfertRoutes = require('./routes/TransfertRoutes')
const venteRoutes = require('./routes/VenteRoutes')
const centerProductRoutes = require('./routes/CenterProductRoutes')
const centerVent = require('./routes/VenteCenterRoutes')
const centerClient = require('./routes/CenterClientRoutes')
const authRoutes = require('./routes/AuthRoutes/Auth')
const centerAuthRoutes = require('./routes/AuthRoutes/AuthCenter')
const authMiddleware = require('./middleware/AuthMiddleware')
const centerAuthMiddleware = require('./middleware/AuthCenterMiddleware')

require('dotenv').config()

port = process.env.PORT




app.use(express.json())
app.use(cors())

app.use('/api/v1/', authRoutes)
app.use('/api/v1/center', centerAuthRoutes)
app.use('/api/v1/products', authMiddleware, productRoutes)
app.use('/api/v1/fournisseur', authMiddleware, fournisseurRoutes)
app.use('/api/v1/client', authMiddleware, clientRoutes)
app.use('/api/v1/center', authMiddleware, centerRoutes)
app.use('/api/v1/employee', authMiddleware, employeeRoutes)
app.use('/api/v1/achat', authMiddleware, achatRoutes)
app.use('/api/v1/transfert', authMiddleware, transfertRoutes)
app.use('/api/v1/vente', authMiddleware, venteRoutes)
app.use('/api/v1/centerProduct', centerAuthMiddleware, centerProductRoutes)
app.use('/api/v1/ventCenter', centerAuthMiddleware, centerVent)
app.use('/api/v1/centerClient', centerAuthMiddleware, centerClient)











const start = () => {
    connectDB(process.env.MONGOO_URI)
        .then(() => {
            app.listen(port, () => (
                console.log(`app is listne to the port ${port}`)
            ))
        })
        .catch((err) => {
            console.log(err)
        })
}

start()