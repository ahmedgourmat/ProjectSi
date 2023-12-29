const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema({
    codeCl : {
        type : String,
        required : true
    },
    nomCl : String,
    prenomCl : String,
    adrCl : String ,
    telCl : String ,
    credit : Number
})

const Client = mongoose.model('Client' , ClientSchema)


module.exports = Client