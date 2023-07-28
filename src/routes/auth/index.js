const express = require('express')
const route = express.Router()

const authController = require('../../controllers/auth.controller')
const asyncHandle = require('../../helpers/asyncHandle')
const { authentication } = require('../../utils/auth.utils')

route.post('/shop/login', asyncHandle(authController.login))

route.post('/shop/register', asyncHandle(authController.register))

//Authentication
route.use(authentication)

route.post('/shop/logout', asyncHandle(authController.logout))

module.exports = route