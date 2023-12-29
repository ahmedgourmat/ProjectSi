const express = require('express')
const routes = express.Router()
const {getProducts , postProduct} = require('../controllers/productControllers')


routes.route('/').post(postProduct).get(getProducts)

module.exports = routes