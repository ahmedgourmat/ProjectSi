const express = require('express')
const routes = express.Router()
const {getProducts , postProduct , oneProduct , updateProduct , deleteProduct} = require('../controllers/productControllers')


routes.route('/').post(postProduct).get(getProducts)

routes.route('/:codeP').get(oneProduct).patch(updateProduct).delete(deleteProduct)


module.exports = routes