const express = require('express')
const routes = express.Router()
const {getEmployee , postEmployee , oneEmployee , updateEmployee , deleteEmployee} = require('../controllers/employeeControllers')


routes.route('/').post(postEmployee).get(getEmployee)

routes.route('/:codeE').get(oneEmployee).patch(updateEmployee).delete(deleteEmployee)


module.exports = routes