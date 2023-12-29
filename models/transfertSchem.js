const mongoose = require('mongoose')

const AchatSchema = new mongoose.Schema({
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

const Achat = mongoose.model('Achat' , AchatSchema)


module.exports = Achat