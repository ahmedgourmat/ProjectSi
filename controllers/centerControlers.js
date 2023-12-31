const Center = require('../models/centerSchema')


const getCenter = async (req, res) => {
    try {
      const center = await Center.find();
      if(center){
        res.status(200).json(center);
      }else {
        throw Error('there is no Center')
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

const postCenter = async (req, res) => {
    const {codeCt , designCt} = req.body
  
    try {

        const center = await Center.findOne({codeCt})

        if(center){
            throw Error('there is already a Center with this codeCt')
        }

      const data = await Center.create({codeCt, designCt})
      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

const oneCenter = async(req,res)=>{
    const {codeCt} = req.params

    try {
        const center = await Center.findOne({codeCt})
        // console.log(center)
        if(center){
            res.status(200).json(center)
        }else{
            throw Error('There is no Center with this code')
        }
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}



const updateCenter = async(req,res)=>{
    const {codeCt} = req.params
    const {designCt} = req.body

    try {
        const center = await Center.findOneAndUpdate({codeCt} ,{designCt})
        // console.log(center)
        if(center){
            res.status(200).json(center)
        }else{
            throw Error('There is no Center with this code')
        }
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}

const deleteCenter = async(req,res)=>{
    const {codeCt} = req.params

    try {
        const center = await Center.findOneAndDelete({codeCt})
        // console.log(center)
        if(center){
            res.status(200).json(center)
        }else{
            throw Error('There is no Center with this code')
        }
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}


module.exports = {getCenter , postCenter , oneCenter , updateCenter , deleteCenter}