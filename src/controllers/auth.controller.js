const authService = require("../services/auth.service");

class AuthController {

    register = async (req, res, next) => {

        return res.status(201).json(await authService.register(req.body))
    }
}

module.exports = new AuthController