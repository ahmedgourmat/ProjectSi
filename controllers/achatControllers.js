const Achat = require('../models/achatSchema')
const Fournisseur = require('../models/fournisseurSchema')
const Product = require('../models/ProductSchema')


const getAchat = async (req, res) => {
    try {
      const achat = await Achat.find();
      if(achat){
        res.status(200).json(achat);
      }else {
        throw Error('there is no Achat')
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

const postAchat = async (req, res) => {
    const {dateA , codeF , codeP , qteA , montant} = req.body
  
    try {
        const fournisseur = await Fournisseur.findOne({codeF})
        if(!fournisseur){
            throw Error('there is no fournisseur with this code')
        }

        const product = await Product.findOne({codeP})

        if(!product){
            throw Error('there is no product with this code')
        }


        const achat = await Achat.findOne({dateA ,codeF : fournisseur._id , codeP : product._id })

        if(achat){
            throw Error('there is already a Achat with this date and codeF and codeP')
        }

      const data = await Achat.create({dateA , codeF : fournisseur._id , codeP : product._id , qteA , montant })
      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

const oneAchat = async(req,res)=>{
    const {dateA , codeF , codeP} = req.params

    const fournisseur = await Fournisseur.findOne({codeF})
    
    if(!fournisseur){
        throw Error('there is no fournisseur with this code')
    }

    const product = await Product.findOne({codeP})

    if(!product){
        throw Error('there is no product with this code')
    }

    try {
        const achat = await Achat.findOne({dateA , codeF : fournisseur._id , codeP : product._id})
        // console.log(achat)
        if(achat){
            res.status(200).json(achat)
        }else{
        throw Error('There is no Achat with this date and codeF and codeP')
        }
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}



const updateAchat = async(req,res)=>{
    const {dateA , codeF , codeP} = req.params

    const {qteA , montant} = req.body

    const fournisseur = await Fournisseur.findOne({codeF})
    
    if(!fournisseur){
        throw Error('there is no fournisseur with this code')
    }

    const product = await Product.findOne({codeP})

    if(!product){
        throw Error('there is no product with this code')
    }

    try {
        const achat = await Achat.findOneAndUpdate({dateA , codeF : fournisseur._id , codeP : product._id} ,{qteA , montant})
        // console.log(achat)
        if(achat){
            res.status(200).json(achat)
        }else{
            throw Error('There is no Achat with this code')
        }
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}

const deleteAchat = async(req,res)=>{
    const {dateA , codeF , codeP} = req.params

    const fournisseur = await Fournisseur.findOne({codeF})
    
    if(!fournisseur){
        throw Error('there is no fournisseur with this code')
    }

    const product = await Product.findOne({codeP})

    if(!product){
        throw Error('there is no product with this code')
    }

    try {
        const achat = await Achat.findOneAndDelete({dateA , codeF : fournisseur._id , codeP : product._id})
        // console.log(achat)
        if(achat){
            res.status(200).json(achat)
        }else{
        throw Error('There is no Achat with this date and codeF and codeP')
        }
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}


module.exports = {getAchat , postAchat , oneAchat , updateAchat , deleteAchat}