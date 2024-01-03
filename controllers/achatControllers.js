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
    const {dateA , codeF , codeP , qteA , payed} = req.body
  
    try {

        if(!dateA  || !codeF || !codeP || !qteA ){
            throw Error('Please Fill All the fields')
        }

        const fournisseur = await Fournisseur.findOne({codeF})
        if(!fournisseur){
            throw Error('there is no fournisseur with this code. want to create one ?')
        }

        const product = await Product.findOne({codeP})

        if(!product){
            throw Error('there is no product with this code. want to create one ?')
        }


        const achat = await Achat.findOne({dateA ,codeF, codeP})

        if(achat){
            throw Error('there is already a Achat with this date and codeF and codeP')
        }

        const montant = product.price * qteA

        if(montant < payed ){
            throw Error('you payed to much didn\'t you ?')
        }
        const solde = (montant + fournisseur.solde) - payed

        const qteStock = product.qteStock + qteA

      const data = await Achat.create({dateA , codeF, codeP , qteA , payed , montant})

      await Product.findOneAndUpdate({codeP} , {qteStock})

      await Fournisseur.findOneAndUpdate({codeF},{solde})

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
    const {dateA , codeF , codeP , payed} = req.params

    const {qteA} = req.body

    const fournisseur = await Fournisseur.findOne({codeF})
    
    if(!fournisseur){
        throw Error('there is no fournisseur with this code')
    }

    const product = await Product.findOne({codeP})

    if(!product){
        throw Error('there is no product with this code')
    }

    try {

        const montant = qteA * product.price

        const achat = await Achat.findOneAndUpdate({dateA , codeF , codeP} ,{qteA , montant})

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


    try {
        const achat = await Achat.findOneAndDelete({dateA , codeF , codeP })
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