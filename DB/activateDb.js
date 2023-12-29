const mongoose = require('mongoose')


connectDB = async(url)=>{
    await mongoose.connect(url)
}


module.exports = connectDB