const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')
const AuthCenter = require('../../models/AuthModels/centerAuth')


const generateToken = (id)=>{
    return jwt.sign({id} , process.env.JWT_SECRET , {expiresIn : '3d'})
}



const signUp = async(req ,res)=>{
    const { codeCt, password, confirmPassword } = req.body;

    try {
        if (!codeCt || !password) {
            throw Error('Please fill in all the fields');
        }

        if (password !== confirmPassword) {
            throw Error('The confirm password does not match the password');
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const center = await AuthCenter.create({ codeCt, password: hashPassword });

        if (!center) {
            throw Error('center already existe');
        }

        const token = generateToken(center._id);

        res.status(201).json({ codeCt, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const login = async(req, res)=>{
    const {codeCt , password } = req.body

    try {
        
        if(!codeCt || !password){
            throw Error('Please fill all the fields')
        }

        const center = await AuthCenter.findOne({ codeCt });

        if (!center) {
            throw Error('center not found. Please check your codeCt and password.');
        }

        const isPasswordMatch = await bcrypt.compare(password, center.password);

        if (!isPasswordMatch) {
            throw Error('Invalid password. Please check your codeCt and password.');
        }

        const token = generateToken(center._id);

        res.status(200).json({ codeCt, token });


    } catch (error) {
        res.status(500).json({error : error.message})
    }

}

module.exports = {signUp , login}