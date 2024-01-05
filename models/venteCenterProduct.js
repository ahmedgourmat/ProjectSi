const mongoose = require('mongoose')

const VentCenterSchema = new mongoose.Schema({
    dateVc : {
        type : Date,
        required : true
    },
    codeCt : {
        type : mongoose.Schema.Types.String,
        ref : 'Center'
    },
    codeCc : {
        type : String,
        required : true
    },
    codeCp : {
        type : String,
        required : true
    },
    qteCenter : Number,
    payed : Number ,
    totalPrice : Number
})

const VentCenter = mongoose.model('VentCenter' , VentCenterSchema )


module.exports = VentCenter