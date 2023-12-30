const express = require('express')
const app = express()
const connectDB = require('./DB/activateDb')
const productRoutes = require('./routes/ProductRoutes')
const fournisseurRoutes = require('./routes/FournisseurRoutes')
const clientRoutes = require('./routes/ClientRoutes')

require('dotenv').config()

port = process.env.PORT




app.use(express.json())


app.use('/api/v1/products' , productRoutes)
app.use('/api/v1/fournisseur' , fournisseurRoutes)
app.use('/api/v1/client' , clientRoutes)




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