const mongoose = require('mongoose')

const TransfertSchema = new mongoose.Schema({
    dateT: {
        type : Date ,
        required : true 
    },
    codeCt:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Center'
    },
    codeP : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product'
    },
    qteT : Number,
    Cout : Number
})

const Transfert = mongoose.model('Transfert' , TransfertSchema)


module.exports = Transfert