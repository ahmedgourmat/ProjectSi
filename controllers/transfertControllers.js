const Transfert = require('../models/transfertSchema')
const Center = require('../models/centerSchema')
const Product = require('../models/ProductSchema')


const getTransfert = async (req, res) => {
    try {
      const transfert = await Transfert.find();
      if(transfert){
        res.status(200).json(transfert);
      }else {
        throw Error('there is no Transfert')
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

const postTransfert = async (req, res) => {
    const {dateT , codeCt , codeP , qteT , Cout} = req.body
  
    try {
        const center = await Center.findOne({codeCt})
        if(!center){
            throw Error('there is no center with this code')
        }

        const product = await Product.findOne({codeP})

        if(!product){
            throw Error('there is no product with this code')
        }


        const transfert = await Transfert.findOne({dateT ,codeCt : center._id , codeP : product._id })

        if(transfert){
            throw Error('there is already a Transfert with this date and codeCt and codeP')
        }

      const data = await Transfert.create({dateT , codeCt : center._id , codeP : product._id , qteT , Cout })
      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

const oneTransfert = async(req,res)=>{
    const {dateT , codeCt , codeP} = req.params

    const center = await Center.findOne({codeCt})
    
    if(!center){
        throw Error('there is no center with this code')
    }

    const product = await Product.findOne({codeP})

    if(!product){
        throw Error('there is no product with this code')
    }

    try {
        const transfert = await Transfert.findOne({dateT , codeCt : center._id , codeP : product._id})
        // console.log(transfert)
        if(transfert){
            res.status(200).json(transfert)
        }else{
        throw Error('There is no Transfert with this date and codeCt and codeP')
        }
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}



const updateTransfert = async(req,res)=>{
    const {dateT , codeCt , codeP} = req.params

    const {qteT , Cout} = req.body

    const center = await Center.findOne({codeCt})
    
    if(!center){
        throw Error('there is no center with this code')
    }

    const product = await Product.findOne({codeP})

    if(!product){
        throw Error('there is no product with this code')
    }

    try {
        const transfert = await Transfert.findOneAndUpdate({dateT , codeCt : center._id , codeP : product._id} ,{qteT , Cout})
        // console.log(transfert)
        if(transfert){
            res.status(200).json(transfert)
        }else{
            throw Error('There is no Transfert with this date and codeCt and codeP')
        }
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}

const deleteTransfert = async(req,res)=>{
    const {dateT , codeCt , codeP} = req.params

    const center = await Center.findOne({codeCt})
    
    if(!center){
        throw Error('there is no center with this code')
    }

    const product = await Product.findOne({codeP})

    if(!product){
        throw Error('there is no product with this code')
    }

    try {
        const transfert = await Transfert.findOneAndDelete({dateT , codeCt : center._id , codeP : product._id})
        // console.log(transfert)
        if(transfert){
            res.status(200).json(transfert)
        }else{
        throw Error('There is no Transfert with this date and codeCt and codeP')
        }
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}


module.exports = {getTransfert , postTransfert , oneTransfert , updateTransfert , deleteTransfert}