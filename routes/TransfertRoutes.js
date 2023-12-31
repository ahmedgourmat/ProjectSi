const express = require('express')
const routes = express.Router()
const {getTransfert , postTransfert , oneTransfert , updateTransfert , deleteTransfert} = require('../controllers/transfertControllers')


routes.route('/').post(postTransfert).get(getTransfert)

routes.route('/:dateA/:codeCt/:codeP').get(oneTransfert).patch(updateTransfert).delete(deleteTransfert)


module.exports = routes