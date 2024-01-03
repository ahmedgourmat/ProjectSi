const mongoose = require('mongoose')

const AchatSchema = new mongoose.Schema({
    dateA: {
        type : Date ,
        required : true 
    },
    codeF:{
        type : mongoose.Schema.Types.String,
        ref : 'Fournisseur'
    },
    codeP : {
        type : mongoose.Schema.Types.String,
        ref : 'Product'
    },
    qteA : Number,
    montant : Number
})

const Achat = mongoose.model('Achat' , AchatSchema)


module.exports = Achat