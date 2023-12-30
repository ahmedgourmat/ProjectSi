const express = require('express')
const routes = express.Router()
const {getClient , postClient , oneClient , updateClient , deleteClient} = require('../controllers/clientControllers')


routes.route('/').post(postClient).get(getClient)

routes.route('/:codeCl').get(oneClient).patch(updateClient).delete(deleteClient)


module.exports = routes