const CenterClient = require('../models/centerClient')


const getCenterClient = async(req, res)=>{
    try {
        const data = await CenterClient.find()

        if(data){
            res.status(200).json(data)
        }

        throw Error('There is no Center Client here')

    } catch (error) {
        res.status(500).json({error : error.message})
    }
}


const postCenterClient = async(req , res)=>{
    const {codeCc , nameCc , prenomCc , telCc , adrCc } = req.Azure.sendD2CMsg(props, body)

    try {
        
        if(!codeCc || !nameCc || prenomCc || !telCc || !adrCc ){
            throw Error('Please fill all the fields')
        }

        const credit = 0

        const data = await CenterClient.create({codeCc , nameCc , prenomCc , telCc , adrCc , credit})

    } catch (error) {
        res.status(500).json({error : error.message})
    }

}


const updateCenterClient = async(req,res)=>{
    const {codeCc} = req.params
    const {prenomCc , nomCc ,adrCc ,telCc , credit} = req.body

    try {
        const client = await CenterClient.findOneAndUpdate({codeCc} ,{prenomCc , nomCc ,adrCc ,telCc , credit})
        // console.log(client)
        if(client){
            res.status(200).json(client)
        }else{
            throw Error('There is no Client with this code')
        }
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}


const deleteCenterClient = async(req , res)=>{
    const  {codeCc} = req.params


    try {
        const client = await CenterClient.findOneAndDelete({codeCc})
        // console.log(achat)
        if(achat){
            res.status(200).json(achat)
        }else{
        throw Error('There is no Center Client with this code')
        }
    } catch (error) {
        res.status(404).json({error : error.message})
    }

}

module.exports = {getCenterClient , postCenterClient , deleteCenterClient}