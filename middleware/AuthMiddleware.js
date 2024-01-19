const jwt = require('jsonwebtoken');
const MagasinAuth = require('../models/AuthModels/magasinAuth');

const authMiddleware = async (req, res, next) => {
    const {authorization} = req.headers;

    try {
        if (!authorization) {
            throw Error('Authentication failed. No token provided.');
        }

        const token = authorization.split(' ')[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const magasin = await MagasinAuth.findById({_id :decoded.id});

        if (!magasin) {
            throw Error('User not found.');
        }

        req.user = magasin; // Attach the user object to the request for further use in routes
        next();
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = authMiddleware;
