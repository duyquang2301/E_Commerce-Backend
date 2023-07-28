const { CREATED, SuccessResponse } = require("../core/success.response");
const authService = require("../services/auth.service");

class AuthController {

    login = async (req, res, next) => {
        new SuccessResponse({
            metadata: await authService.login(req.body)
        }).send(res)
    }


    register = async (req, res, next) => {
        new CREATED({
            message: 'Registered OK!',
            metadata: await authService.register(req.body)
        }).send(res)
    }
}

module.exports = new AuthController