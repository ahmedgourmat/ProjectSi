const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema({
    codeCt : {
        type : String,
        required : true
    },
    designCt : String
})

const Client = mongoose.model('Client' , ClientSchema)


module.exports = Client