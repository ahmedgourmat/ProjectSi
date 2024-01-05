const Product = require('../models/ProductSchema')
const CenterProduct = require('../models/centerProduct')
const Center = require('../models/centerSchema')

const getCenterProduct = async (req,res)=>{
    try {
        const data = await CenterProduct.find({})
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}


const postCenterProduct = async(req , res)=>{

    const {codeCp , name , designCp , price , codeCt , codeP} = req.body
    console.log(req.body)

    try {

        if(!codeCp || !name || !codeCt || !designCp || !price || !codeCt || !codeP){
            throw Error('Please Fill All The Fields')
        }

        const centerProduct = await CenterProduct.findOne({codeCp})

        if(centerProduct){
            throw Error('There is already a center product with this code')
        }
        const center = await Center.findOne({codeCt})


        if(!center){
            throw Error('there is no Product with this code')
        }

        const product = await Product.findOne({codeP})


        if(!product){
            throw Error('there is no Product with this code')
        }


        const data = await CenterProduct.create({codeCp , name , designCp , price , quantity : 0 , codeCt , codeP})

        res.status(201).json(data)
        
    } catch (error) {
        res.json(500).json({error : error.message})
    }
}


const updateCenterProduct = async(req , res)=>{
    const {codeCp} = req.params
    const {name , designCp , price , quantity} = req.body

    try {
        
        if(quantity < 0 || price < 0 ){
            throw Error('Enter Real Values')
        }

        const data = await CenterProduct.findByIdAndUpdate({codeCp} ,{name , designCp , price , quantity} )

        res.status(200).json(data)
    
    } catch (error) {
        res.status(500).json({error : error.message})
    }

}

const deleteCenterProduct = async(req,res)=>{
    const {codeCp} = req.params


    try {

        const data = await CenterProduct.findOneAndDelete({codeCp})

        res.status(200).json(data)
        
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}


module.exports = {getCenterProduct , postCenterProduct , updateCenterProduct , deleteCenterProduct}