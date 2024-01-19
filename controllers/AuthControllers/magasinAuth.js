const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')
const MagasinAuth = require('../../models/AuthModels/magasinAuth')


const generateToken = (id)=>{
    return jwt.sign({id} , process.env.JWT_SECRET , {expiresIn : '3d'})
}



const signUp = async(req ,res)=>{
    const { email, password, confirmPassword } = req.body;

    try {
        if (!email || !password) {
            throw Error('Please fill in all the fields');
        }

        if (!validator.default.isEmail(email)) {
            throw Error('Please enter a valid email');
        }

        if (password !== confirmPassword) {
            throw Error('The confirm password does not match the password');
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const magasin = await MagasinAuth.create({ email, password: hashPassword });

        const token = generateToken(magasin._id);

        res.status(201).json({ email, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const login = async(req, res)=>{
    const {email , password } = req.body

    try {
        
        if(!email || !password){
            throw Error('Please fill all the fields')
        }

        if (!validator.default.isEmail(email)) {
            throw Error('Please enter a valid email');
        }

        const magasin = await MagasinAuth.findOne({ email });

        if (!magasin) {
            throw Error('User not found. Please check your email and password.');
        }

        const isPasswordMatch = await bcrypt.compare(password, magasin.password);

        if (!isPasswordMatch) {
            throw Error('Invalid password. Please check your email and password.');
        }

        const token = generateToken(magasin._id);

        res.status(200).json({ email, token });


    } catch (error) {
        res.status(500).json({error : error.message})
    }

}

module.exports = {signUp , login}