const mongoose = require('mongoose')

const CenterSchema = new mongoose.Schema({
    codeCt : {
        type : String,
        required : true
    },
    designCt : String
})

const Center = mongoose.model('Center' , CenterSchema)


module.exports = Center