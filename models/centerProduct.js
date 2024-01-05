const mongoose = require('mongoose')

const CenterProductSchema = new mongoose.Schema({
    codeCp : {
        type: String,
        required : true
    },
    name : String,
    designCp : String,
    price : Number,
    quantite : Number,
    codeCt : {
        type : mongoose.Schema.Types.String,
        ref : 'Center',
        required : true
    },
    codeP : {
        type : mongoose.Schema.Types.String,
        ref : 'Product'
    }
})


const CenterProduct = mongoose.model('CenterProduct' , CenterProductSchema)


module.exports = CenterProduct