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
    const {dateT , codeCt , codeP , qteT , payed} = req.body
  
    try {
        const center = await Center.findOne({codeCt})
        if(!center){
            throw Error('there is no center with this code')
        }

        const product = await Product.findOne({codeP})

        if(!product){
            throw Error('there is no product with this code')
        }


        const transfert = await Transfert.findOne({dateT ,codeCt , codeP  })

        if(transfert){
            throw Error('there is already a Transfert with this date and codeCt and codeP')
        }

        const Cout = product.price * qteT
        if(qteT> product.qteStock){
            throw Error('We dont have this quantity')
        }

        const qteStock = product.qteStock - qteT

        const rest = Cout - payed

      const data = await Transfert.create({dateT , codeCt , codeP  , qteT , Cout , payed , rest })

      await Product.findOneAndUpdate({codeP} , {qteStock})

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
        const transfert = await Transfert.findOne({dateT , codeCt , codeP })
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

    const {qteT , payed} = req.body

    const center = await Center.findOne({codeCt})
    
    if(!center){
        throw Error('there is no center with this code')
    }

    const product = await Product.findOne({codeP})

    if(!product){
        throw Error('there is no product with this code')
    }

    if(qteT> product.qteStock){
        throw Error('We dont have this quantity')
    }

    const qteStock = product.qteStock - qteT

    await Product.findOneAndUpdate({codeP} , {qteStock})

    const transfert = await Transfert.findOne({dateT , codeCt , codeP })

    if(payed> transfert.rest){
        throw Error('that\'s a lot of money')
    }

    const rest = transfert.rest - payed

    try {
        const transfert = await Transfert.findOneAndUpdate({dateT , codeCt , codeP } ,{qteT , rest})
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
    const {dateA , codeCt , codeP} = req.params

    const center = await Center.findOne({codeCt})
    
    if(!center){
        throw Error('there is no center with this code')
    }

    const product = await Product.findOne({codeP})

    if(!product){
        throw Error('there is no product with this code')
    }

    try {
        const transfert = await Transfert.findOneAndDelete({dateT : dateA , codeCt , codeP })
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