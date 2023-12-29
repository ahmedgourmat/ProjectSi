const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    codeE : {
        type : String,
        required : true
    },
    nomE : String,
    prenomE : String,
    adrE : String ,
    telE : String ,
    salaire : Number,
    codeCt : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Center'
    }
})

const Employee = mongoose.model('Employee' , EmployeeSchema)


module.exports = Employee