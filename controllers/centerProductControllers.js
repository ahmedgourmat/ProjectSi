const CenterProduct = require('../models/centerProduct')

const getCenterProduct = async (req,res)=>{

    const codeCt = req.user.codeCt

    try {
        const data = await CenterProduct.find({codeCt})
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}


const postCenterProduct = async(req , res)=>{

    const {codeCp , name , designCp , price , codeCt} = req.body

    try {

        if(!codeCp || !name || !codeCt || !designCp || !price || !codeCt){
            throw Error('Please Fill All The Fields')
        }

        const product = await CenterProduct.findOne({codeCp , codeCt})


        if(product){
            throw Error('This Product already exist in this Center')
        }

        const quantite = 0

        const data = await CenterProduct.create({codeCp , name , designCp , price , quantite, codeCt })

        res.status(201).json(data)
        
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}


const updateCenterProduct = async (req, res) => {
    const { codeCp, codeCt } = req.params;
    const { name, designCp, price, quantite } = req.body;

    console.log(req.params)

    try {   
        if (quantite < 0 || price < 0) {
            throw Error('Enter Real Values');
        }

        // Assuming codeCp and codeCt are string values
        const data = await CenterProduct.findOneAndUpdate(
            { codeCp , codeCt},
            { name, designCp, price, quantite },
            { new: true } // This option returns the modified document rather than the original
        );


        if (data) {
            console.log('Updated document:', data);
            res.status(200).json(data);
        } else {
            console.log('Document not found');
            res.status(404).json({ error: 'Document not found' });
        }

    } catch (error) {
        console.error('Error updating document:', error);
        res.status(500).json({ error: error.message });
    }
};


const deleteCenterProduct = async(req,res)=>{
    const {codeCp} = req.params


    try {

        const data = await CenterProduct.findOneAndDelete({codeCp})

        res.status(200).json(data)
        
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}


module.exports = {getCenterProduct , postCenterProduct , updateCenterProduct , deleteCenterProduct}