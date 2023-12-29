const Product = require('../models/ProductSchema')

const getProducts = async(req,res)=>{
    try {
        const data = await Product.find({})
        console.log(data)
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}



const postProduct = async(req,res)=>{

    const {codeP , designP , qteStock} = req.body
    try {
        const data = await Product.create({codeP , designP , qteStock})
        console.log(data) 
        res.status(201).json({data})
    } catch (error) {
        console.log({error : error.message})
    }
}

module.exports = {getProducts , postProduct}