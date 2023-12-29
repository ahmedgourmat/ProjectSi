const mongoose = require('mongoose')

const FournisseurSchema = new mongoose.Schema({
    codeF : {
        type : String,
        required : true
    },
    nomF : String,
    prenomF : String,
    adrF : String ,
    telF : String ,
    solde : Number
})

const Fournisseur = mongoose.model('Fournisseur' , FournisseurSchema)


module.exports = Fournisseur