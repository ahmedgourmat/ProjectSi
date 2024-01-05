const mongoose = require('mongoose')

const TransfertSchema = new mongoose.Schema({
    dateT: {
        type : Date ,
        required : true 
    },
    codeCt:{
        type : mongoose.Schema.Types.String,
        ref : 'Center'
    },
    codeP : {
        type : mongoose.Schema.Types.String,
        ref : 'Product'
    },
    qteT : Number,
    Cout : Number,
    payed : Number,
    rest: Number
})

const Transfert = mongoose.model('Transfert' , TransfertSchema)


module.exports = Transfert