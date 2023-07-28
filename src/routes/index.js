const express = require('express')
const { apiKey, permission } = require('../utils/checkAuth.utils')
const route = express.Router()

//check apiKey
route.use(apiKey)
// check permission
route.use(permission('0000'))


route.use('/v1/api', require('./auth/'))



module.exports = route