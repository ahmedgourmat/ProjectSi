const CenterClient = require('../models/centerClient')


const getCenterClient = async(req, res)=>{

    const codeCt = req.user.codeCt

    try {
        const data = await CenterClient.find({codeCt})

        if(data){
            res.status(200).json(data)
        }

        throw Error('There is no Center Client here')

    } catch (error) {
        res.status(500).json({error : error.message})
    }
}


const postCenterClient = async(req , res)=>{
    const {codeCc , nameCc , prenomCc , telCc , adrCc , codeCt } = req.body

    try {
        
        if(!codeCc || !nameCc || !prenomCc || !telCc || !adrCc ){
            throw Error('Please fill all the fields')
        }

        const credit = 0

        const data = await CenterClient.create({codeCc , nameCc , prenomCc , telCc , adrCc , credit , codeCt})

        res.status(201).json(data)

    } catch (error) {
        res.status(500).json({error : error.message})
    }

}


const updateCenterClient = async (req, res) => {
    const { codeCc, codeCt } = req.params;
    const { prenomCc, nameCc, adrCc, telCc, credit } = req.body;

    try {
        const client = await CenterClient.findOneAndUpdate({ codeCc, codeCt }, {
            prenomCc,
            nameCc, // changed from nomCc to nameCc
            adrCc,
            telCc,
            credit
        });

        if (client) {
            res.status(200).json(client);
        } else {
            throw Error('There is no Client with this code');
        }
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}



const deleteCenterClient = async(req , res)=>{
    const  {codeCc , codeCt} = req.params


    try {
        const client = await CenterClient.findOneAndDelete({codeCc ,codeCt})
        // console.log(client)
        if(client){
            res.status(200).json(client)
        }else{
        throw Error('There is no Center Client with this code')
        }
    } catch (error) {
        res.status(404).json({error : error.message})
    }

}

module.exports = {getCenterClient , postCenterClient , deleteCenterClient , updateCenterClient}