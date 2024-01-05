const mongoose = require('mongoose')

const VenteSchema = new mongoose.Schema({
    dateV : {
        type : Date,
        required : true
    },
    codeCl : {
        type : mongoose.Schema.Types.String,
        ref : 'Client',
        required : true
    },
    codeP : {
        type : mongoose.Schema.Types.String,
        ref : 'Product',
        required : true
    },
    qteV : Number,
    montantV : Number,
    rest : Number

})

const Vente = mongoose.model('Vente' , VenteSchema)


module.exports = Vente