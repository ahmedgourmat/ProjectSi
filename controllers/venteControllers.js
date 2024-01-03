const Vente = require('../models/ventSchema')
const Client = require('../models/clientSchema')
const Product = require('../models/ProductSchema')


const getVente = async (req, res) => {
    try {
      const vente = await Vente.find();
      if(vente){
        res.status(200).json(vente);
      }else {
        throw Error('there is no Vente')
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

const postVente = async (req, res) => {
    const {dateV , codeCl , codeP , qteV} = req.body
    console.log(req.body)
  
    try {
        console.log(req.body)
        if(!dateV || !codeCl || !codeP || !qteV ){
            throw Error('Please Fill all the fields')
        }

        const client = await Client.findOne({codeCl})
        if(!client){
            throw Error('there is no client with this code')
        }

        const product = await Product.findOne({codeP})

        if(!product){
            throw Error('there is no product with this code')
        }


        const vente = await Vente.findOne({dateV ,codeCl, codeP })

        if(vente){
            throw Error('there is already a Vente with this date and codeCl and codeP')
        }


        const montantV = qteV * product.price

      const data = await Vente.create({dateV , codeCl, codeP , qteV , montantV })
      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

const oneVente = async(req,res)=>{
    const {dateV , codeCl , codeP} = req.params

    const client = await Client.findOne({codeCl})
    
    if(!client){
        throw Error('there is no client with this code')
    }

    const product = await Product.findOne({codeP})

    if(!product){
        throw Error('there is no product with this code')
    }

    try {
        const vente = await Vente.findOne({dateV , codeCl, codeP})
        // console.log(vente)
        if(vente){
            res.status(200).json(vente)
        }else{
        throw Error('There is no Vente with this date and codeCl and codeP')
        }
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}



const updateVente = async(req,res)=>{
    const {dateA , codeCl , codeP} = req.params

    console.log(req.params)

    const {qteV} = req.body

    const client = await Client.findOne({codeCl})
    
    if(!client){
        throw Error('there is no client with this code')
    }

    const product = await Product.findOne({codeP})

    if(!product){
        throw Error('there is no product with this code')
    }

    try {

        const montantV = qteV * product.price

        const vente = await Vente.findOneAndUpdate({dateV : dateA , codeCl, codeP} ,{qteV , montantV})
        // console.log(vente)
        if(vente){
            res.status(200).json(vente)
        }else{
            throw Error('There is no Vente with this date and codeCl and codeP')
        }
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}

const deleteVente = async(req,res)=>{
    const {dateA , codeCl , codeP} = req.params
    console.log(req.params)

    const client = await Client.findOne({codeCl})
    
    if(!client){
        throw Error('there is no client with this code')
    }

    const product = await Product.findOne({codeP})

    if(!product){
        throw Error('there is no product with this code')
    }

    try {
        console.log({dateA , codeCl, codeP})
        const vente = await Vente.findOneAndDelete({dateV : dateA , codeCl, codeP})
        console.log(vente)
        if(vente){
            res.status(200).json(vente)
        }else{
        throw Error('There is no Vente with this date and codeCl and codeP')
        }
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}


module.exports = {getVente , postVente , oneVente , updateVente , deleteVente}