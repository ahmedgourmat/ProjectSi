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

    const {codeCp , name , designCp , price , codeCt ,quantite} = req.body

    try {

        if(!codeCp || !name || !codeCt || !designCp || !price || !quantite || !codeCt){
            throw Error('Please Fill All The Fields')
        }

        const product = await CenterProduct.findOne({codeCp , codeCt})


        if(product){
            throw Error('This Product already exist in this Center')
        }

        const data = await CenterProduct.create({codeCp , name , designCp , price , quantite, codeCt })

        res.status(201).json(data)
        
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}


const updateCenterProduct = async (req, res) => {
    const { codeCp, codeCt } = req.params;
    const { name, designCp, price, quantite } = req.body;

    try {
        // Assuming codeCp and codeCt are string values
        const existingData = await CenterProduct.findOne({ codeCp, codeCt });

        if (!existingData) {
            console.log('Document not found');
            return res.status(404).json({ error: 'Document not found' });
        }

        // Update only the fields that are provided in the request
        const updatedData = {
            name: name || existingData.name,
            designCp: designCp || existingData.designCp,
            price: price ? price : existingData.price, // Only update if price is non-negative
            quantite: quantite ? quantite : existingData.quantite // Only update if quantite is non-negative
        };

        // Update the document
        const data = await CenterProduct.findOneAndUpdate(
            { codeCp, codeCt },
            updatedData,
            { new: true }
        );

        res.status(200).json(data);

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