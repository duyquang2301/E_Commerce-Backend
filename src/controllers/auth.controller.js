const { CREATED } = require("../core/success.response");
const authService = require("../services/auth.service");

class AuthController {

    register = async (req, res, next) => {
        new CREATED({
            message: 'Registered OK!',
            metadata: await authService.register(req.body)
        }).send(res)
    }
}

module.exports = new AuthController