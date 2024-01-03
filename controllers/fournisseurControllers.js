const Fournisseur = require('../models/fournisseurSchema')

const getFournisseur = async (req, res) => {
    try {
      const data = await Fournisseur.find();
      if(data){
        res.status(200).json(data);
      }else {
        throw Error('there is no fournisseur')
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

const postFournisseur = async (req, res) => {
    const {codeF,prenomF , nomF ,adrF ,telF} = req.body
  
    try {

        const data = await Fournisseur.findOne({codeF})

        if(data){
            throw Error('there is already a fournisseur with this codeF')
        }
        const solde = 0

      const fournisseur = await Fournisseur.create({codeF,prenomF , nomF ,adrF ,telF , solde})
      res.status(201).json(fournisseur);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

const oneFournisseur = async(req,res)=>{
    const {codeF} = req.params

    try {
        const data = await Fournisseur.findOne({codeF})
        // console.log(data)
        if(data){
            res.status(200).json(data)
        }else{
            throw Error('There is no Fournisseur with this code')
        }
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}



const updateFournisseur = async(req,res)=>{
    const {codeF} = req.params
    const {prenomF , nomF ,adrF ,telF , solde} = req.body

    try {
        const product = await Fournisseur.findOneAndUpdate({codeF} ,{prenomF , nomF ,adrF ,telF , solde})
        // console.log(data)
        if(product){
            res.status(200).json(product)
        }else{
            throw Error('There is no Fournisseur with this code')
        }
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}

const deleteFournisseur = async(req,res)=>{
    const {codeF} = req.params

    try {
        const product = await Fournisseur.findOneAndDelete({codeF})
        // console.log(data)
        if(product){
            res.status(200).json(product)
        }else{
            throw Error('There is no Fournisseur with this code')
        }
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}


module.exports = {getFournisseur , postFournisseur , oneFournisseur , updateFournisseur , deleteFournisseur}