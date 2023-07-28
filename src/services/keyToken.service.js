'use strict';

const keyTokenModel = require('../models/keyToken.model');
const { Types: { ObjectId } } = require('mongoose')

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        try {
            // const tokens = await keyTokenModel.create({
            //     user: userId,
            //     publicKey,
            //     privateKey
            // })
            // return tokens ? tokens.publicKey : null
            const filter = { user: userId }, update = {
                publicKey, privateKey, refreshTokensUsed: [], refreshToken
            }, options = { upsert: true, new: true }

            const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options)

            return tokens ? tokens.publicKey : null
        } catch (error) {
            return error
        }
    }

    static findByUserId = async (userId) => {
        return await keyTokenModel.findOne({ user: new ObjectId(userId) }).lean()
    }

    static removeKeyById = async (userId) => {
        return await keyTokenModel.deleteOne({ _id: new ObjectId(userId) });
    }
}

module.exports = KeyTokenService