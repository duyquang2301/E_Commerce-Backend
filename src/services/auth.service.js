const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const keyTokenService = require("./keyToken.service")
const { createTokenPair } = require("../utils/auth.utils")
const { getIntoData } = require("../utils")
const { BadRequestError } = require("../core/error.response")

const RoleShop = {
    SHOP: "SHOP",
    WRITER: "WRITER",
    EDITOR: "EDITOR",
    ADMIN: "ADMIN",
}

class AuthService {
    static register = async ({ name, email, password }) => {
        //step1: check email exist?
        a
        const holderShop = await shopModel.findOne({ email }).lean()
        if (holderShop) {
            throw new BadRequestError('Error:Shop already register')
        }
        const passwordHash = await bcrypt.hash(password, 10)
        const newShop = await shopModel.create({
            name, email, password: passwordHash, roles: [RoleShop.SHOP]
        })
        if (newShop) {
            const publicKey = crypto.randomBytes(64).toString("hex");
            const privateKey = crypto.randomBytes(64).toString("hex");
            const keyStore = await keyTokenService.createKeyToken({
                userId: newShop._id,
                publicKey,
                privateKey
            })
            if (!keyStore) {
                throw new BadRequestError('Error: KeyStore Error')
            }

            //created token pair
            const tokens = await createTokenPair({ userId: newShop._id, email }, publicKey, privateKey)
            console.log(`Created token pair Successfully::::`, tokens)
            return {
                code: 201,
                metadata: {
                    shop: getIntoData({ fields: ['_id', 'name', 'email'], object: newShop }),
                    tokens
                }
            }
        }
        return {
            code: 200,
            metadata: null
        }
    }
}
module.exports = AuthService