const express = require('express')
const app = express()
const connectDB = require('./DB/activateDb')
const productRoutes = require('./routes/ProductRoutes')

require('dotenv').config()

port = process.env.PORT




app.use(express.json())


app.use('/api/v1/products' , productRoutes)


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