const express = require('express')
const routes = express.Router()
const {getFournisseur , postFournisseur , oneFournisseur , updateFournisseur , deleteFournisseur} = require('../controllers/fournisseurControllers')


routes.route('/').post(postFournisseur).get(getFournisseur)

routes.route('/:codeF').get(oneFournisseur).patch(updateFournisseur).delete(deleteFournisseur)


module.exports = routes