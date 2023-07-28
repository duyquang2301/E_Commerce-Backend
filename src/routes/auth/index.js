const express = require('express')
const route = express.Router()

const authController = require('../../controllers/auth.controller')
const { asyncHandle } = require('../../utils/checkAuth.utils')

route.post('/shop/login', asyncHandle(authController.login))

route.post('/shop/register', asyncHandle(authController.register))

module.exports = route