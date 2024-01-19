const express = require('express')
const routes = express.Router()
const { login, signUp  } = require('../../controllers/AuthControllers/centerAuth')


routes.route('/login').post(login)
routes.route('/signup').post(signUp)




module.exports = routes