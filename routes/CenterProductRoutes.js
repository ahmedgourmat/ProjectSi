const express = require('express')
const routes = express.Router()
const {getCenterProduct , postCenterProduct , updateCenterProduct , deleteCenterProduct} = require('../controllers/centerProductControllers')


routes.route('/').post(postCenterProduct).get(getCenterProduct)

routes.route('/:codeCp').patch(updateCenterProduct).delete(deleteCenterProduct)


module.exports = routes