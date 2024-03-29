const Product = require('../models/ProductSchema')

const getProducts = async(req,res)=>{

    try {
        const data = await Product.find({})

        if(data){
            res.status(200).json(data)
        }else{
            throw Error('There is no products for the moment')
        }
    } catch (error) {
        console.log(error)
    }
}



const postProduct = async(req,res)=>{

    const {codeP , designP , price , nameP} = req.body

    try {

        const product = await Product.findOne({codeP})

        if(product){
            throw Error('There is already a product with this codeP')
        }

        const qteStock = 0

        const data = await Product.create({codeP , designP , qteStock , nameP , price})
        console.log(data) 
        res.status(201).json({data})
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}


const oneProduct = async(req,res)=>{
    const {codeP} = req.params
    console.log(req)

    try {
        const data = await Product.findOne({codeP})
        // console.log(data)
        if(data){
            res.status(200).json(data)
        }else{
            throw Error('There is no product with this code')
        }
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}


const updateProduct = async(req,res)=>{
    const {codeP} = req.params
    const {designP , qteStock , price} = req.body

    try {
        const product = await Product.findOneAndUpdate({codeP} ,{designP , qteStock , price})
        // console.log(data)
        if(product){
            res.status(200).json(product)
        }else{
            throw Error('There is no product with this code')
        }
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}

const deleteProduct = async(req,res)=>{
    const {codeP} = req.params

    try {
        const product = await Product.findOneAndDelete({codeP})
        // console.log(data)
        if(product){
            res.status(200).json(product)
        }else{
            throw Error('There is no product with this code')
        }
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}




module.exports = {getProducts , postProduct , oneProduct , updateProduct , deleteProduct}