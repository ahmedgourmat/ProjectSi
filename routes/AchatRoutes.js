const express = require('express')
const routes = express.Router()
const {getAchat , postAchat , oneAchat , updateAchat , deleteAchat} = require('../controllers/achatControllers')


routes.route('/').post(postAchat).get(getAchat)

routes.route('/:dateA/:codeF/:codeP').get(oneAchat).patch(updateAchat).delete(deleteAchat)


module.exports = routes