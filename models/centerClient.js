const mongoose = require('mongoose')


const CenterClientSchema = new mongoose.Schema({
    codeCc : {
        type : String ,
        required : true
    },
    codeCt : {
        type : mongoose.Schema.Types.String,
        ref : 'Center'
    },
    nameCc : String,
    prenomCc : String,
    telCc : String,
    adrCc : String,
    credit : String
})

const CenterClient = mongoose.model('CenterClient' , CenterClientSchema)


module.exports = CenterClient