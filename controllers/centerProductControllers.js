const CenterProduct = require('../models/centerProduct')

const getCenterProduct = async (req,res)=>{

    const codeCt = req.user.codeCt

    try {
        const data = await CenterProduct.find({codeCt})
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}


const postCenterProduct = async(req , res)=>{

    const {codeCp , name , designCp , price , codeCt} = req.body

    try {

        if(!codeCp || !name || !codeCt || !designCp || !price || !codeCt){
            throw Error('Please Fill All The Fields')
        }

        const product = await CenterProduct.findOne({codeCp , codeCt})


        if(product){
            throw Error('This Product already exist in this Center')
        }

        const data = await CenterProduct.create({codeCp , name , designCp , price , quantity : 0 , codeCt })

        res.status(201).json(data)
        
    } catch (error) {
        res.status(500).json({error : error.message})
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