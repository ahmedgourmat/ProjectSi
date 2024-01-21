const VentCenter = require('../models/venteCenterProduct')
const CenterProduct = require('../models/centerProduct')
const CenterClient = require('../models/centerClient')


const getVentCenter = async (req,res)=>{

    const codeCt = req.user.codeCt

    try {
        const data = await VentCenter.find({codeCt})

        if(!data){
            throw Error('there is no data')
        }
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}


const postVentCenter = async(req , res)=>{

    const {dateVc , codeCc , codeCp , qteCenter , payed , codeCt } = req.body
    console.log(req.body)

    try {

        if(!codeCp || !dateVc || !codeCc || !qteCenter || !payed ){
            throw Error('Please Fill All The Fields')
        }

        console.log('here1')


        const existe = await VentCenter.findOne({dateVc , codeCc , codeCp , codeCt})

        if(existe){
            throw Error('there is already this vente on this day with the same client and product')
        }

        const centerProduct = await CenterProduct.findOne({codeCp , codeCt})

        if(!centerProduct){
            throw Error('there is no product with this code')
        }
        console.log('here2')

        const qteRest = centerProduct.quantite - qteCenter

        await CenterProduct.findOneAndUpdate({codeCp , codeCt} , {quantite : qteRest})

        const totalPrice = centerProduct.price * qteCenter

        if(payed>totalPrice){
            throw Error('that\'s to much')
        }
        

        const centerClient = await CenterClient.findOne({codeCc , codeCt})
        
        if(!centerClient){
            throw Error('there is no product with this code')
        }
        console.log('here3')

        const credit = (totalPrice - payed) + centerClient.credit

        await CenterClient.findOneAndUpdate({codeCc , codeCt} , {credit})

        console.log('here4')
        

        const data = await VentCenter.create({dateVc , codeCp , codeCc , codeCp , qteCenter , payed , totalPrice , codeCt})


        res.status(201).json(data)
        
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

const deleteVentCenter = async(req,res)=>{
    const {dateVc , codeCc , codeCp , codeCt} = req.params


    try {

        const data = await VentCenter.findOneAndDelete({dateVc , codeCc , codeCp  , codeCt})

        res.status(200).json(data)
        
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}


module.exports = {getVentCenter , postVentCenter , deleteVentCenter}