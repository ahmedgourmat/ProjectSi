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


require('dotenv').config()

port = process.env.PORT




app.use(express.json())
app.use(cors())


app.use('/api/v1/products' , productRoutes)
app.use('/api/v1/fournisseur' , fournisseurRoutes)
app.use('/api/v1/client' , clientRoutes)
app.use('/api/v1/center' , centerRoutes)
app.use('/api/v1/employee' , employeeRoutes)
app.use('/api/v1/achat' , achatRoutes)
app.use('/api/v1/transfert' , transfertRoutes)
app.use('/api/v1/vente' , venteRoutes)








const start = ()=>{
    connectDB(process.env.MONGOO_URI)
    .then(()=>{
        app.listen(port,()=>(
            console.log(`app is listne to the port ${port}`)
        ))
    })
    .catch((err)=>{
        console.log(err)
    })
}

start()