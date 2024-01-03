const express = require('express')
const routes = express.Router()
const {getVente , postVente , oneVente , updateVente , deleteVente} = require('../controllers/venteControllers')


routes.route('/').post(postVente).get(getVente)

routes.route('/:dateA/:codeCl/:codeP').get(oneVente).patch(updateVente).delete(deleteVente)


module.exports = routes