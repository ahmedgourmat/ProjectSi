const express = require('express')
const routes = express.Router()
const {getVentCenter , postVentCenter, deleteVentCenter} = require('../controllers/ventCenterControllers')


routes.route('/').post(postVentCenter).get(getVentCenter)

routes.route('/:dateVc/:codeCc/:codeCp/:codeCt').delete(deleteVentCenter)


module.exports = routes