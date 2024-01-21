const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    codeP : {
        type : String,
        required : true
    },
    designP : String,
    qteStock : Number,
    price : Number,
    nameP : String
})

const Product = mongoose.model('Product' , ProductSchema)


module.exports = Product