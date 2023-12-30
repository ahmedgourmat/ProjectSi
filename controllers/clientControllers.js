const Client = require('../models/clientSchema')

const getClient = async (req, res) => {
    try {
      const client = await Client.find();
      if(client){
        res.status(200).json(client);
      }else {
        throw Error('there is no Client')
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

const postClient = async (req, res) => {
    const {codeCl,prenomCl , nomCl ,adrCl ,telCl , credit} = req.body
  
    try {

        const client = await Client.findOne({codeCl})

        if(client){
            throw Error('there is already a Client with this codeCl')
        }

      const fournisseur = await Client.create({codeCl,prenomCl , nomCl ,adrCl ,telCl , credit})
      res.status(201).json(fournisseur);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

const oneClient = async(req,res)=>{
    const {codeCl} = req.params

    try {
        const client = await Client.findOne({codeCl})
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



const updateClient = async(req,res)=>{
    const {codeCl} = req.params
    const {prenomCl , nomCl ,adrCl ,telCl , credit} = req.body

    try {
        const client = await Client.findOneAndUpdate({codeCl} ,{prenomCl , nomCl ,adrCl ,telCl , credit})
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

const deleteClient = async(req,res)=>{
    const {codeCl} = req.params

    try {
        const client = await Client.findOneAndDelete({codeCl})
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


module.exports = {getClient , postClient , oneClient , updateClient , deleteClient}