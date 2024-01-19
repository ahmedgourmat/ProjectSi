const mongoose = require('mongoose')


const MagasinAuthSchema = new mongoose.Schema({
    email : {
        type: String,  
        required : true
    },
    password : {
        type : String ,
        required : true
    }
})


const MagasinAuth = mongoose.model('MagasinAuth' , MagasinAuthSchema)

module.exports = MagasinAuth