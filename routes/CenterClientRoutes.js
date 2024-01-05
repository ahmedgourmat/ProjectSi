const express = require('express')
const routes = express.Router()
const {getCenterClient , postCenterClient  , deleteCenterClient} = require('../controllers/centerClientControllers')


routes.route('/').post(postCenterClient).get(getCenterClient)

routes.route('/:codeCp').delete(deleteCenterClient)


module.exports = routes