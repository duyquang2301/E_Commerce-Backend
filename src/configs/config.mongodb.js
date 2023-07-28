const config = {
    app: {
        port: process.env.PORT
    },
    db: {
        host: process.env.MONGO_HOST,
        port: process.env.MONGO_PORT,
        name: process.env.MONGO_DATABASE
    }
}
module.exports = config