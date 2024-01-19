const mongoose = require('mongoose')

const AuthCenterSchema = new mongoose.Schema({
    codeCt : {
        type : mongoose.Schema.Types.String,
        ref : 'Center',
        requierd : true
    },
    password : {
        type : String,
        requierd : true
    }
})

const AuthCenter = mongoose.model('AuthCenter' , AuthCenterSchema)


module.exports = AuthCenter