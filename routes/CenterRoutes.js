const express = require('express')
const routes = express.Router()
const {getCenter , postCenter , oneCenter , updateCenter , deleteCenter} = require('../controllers/centerControlers')


routes.route('/').post(postCenter).get(getCenter)

routes.route('/:codeCt').get(oneCenter).patch(updateCenter).delete(deleteCenter)


module.exports = routes