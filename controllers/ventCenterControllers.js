const VentCenter = require('../models/venteCenterProduct')
const CenterProduct = require('../models/centerProduct')
const CenterClient = require('../models/centerClient')


const getVentCenter = async (req,res)=>{
    try {
        const data = await VentCenter.find({})
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}


const postVentCenter = async(req , res)=>{

    const {dateVc , codeCc , codeCp , qteCenter , payed } = req.body
    console.log(req.body)

    try {

        if(!codeCp || !dateVc || !codeCc || !qteCenter || !payed ){
            throw Error('Please Fill All The Fields')
        }

        const centerProduct = await CenterProduct.findOne({codeCp})

        const totalPrice = price * centerProduct.quantite

        const credit = totalPrice - payed

        await CenterClient.findOneAndUpdate({codeCc} , {credit})

        const data = await VentCenter.create({codeCp , codeCc , codeCp , qteCenter , payed , totalPrice})

        res.status(201).json(data)
        
    } catch (error) {
        res.json(500).json({error : error.message})
    }
}

const deleteVentCenter = async(req,res)=>{
    const {dateVc , codeCc , codeCp} = req.params


    try {

        const data = await VentCenter.findOneAndDelete({dateVc , codeCc , codeCp})

        res.status(200).json(data)
        
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}


module.exports = {getVentCenter , postVentCenter , deleteVentCenter}