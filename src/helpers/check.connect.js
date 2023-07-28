const mongoose = require('mongoose')
const os = require('os')
const process = require('process')
const _SECONDS = 5000
const countConnect = () => {
    const numberConnection = mongoose.connections.length
    console.log(`number of connection: ${numberConnection}`)
}

const checkOverLoad = () => {
    setInterval(() => {
        const numConnection = mongoose.connections.length;
        const numCore = os.cpus().length
        const memoryUsage = process.memoryUsage().rss
    }, _SECONDS); // monitor every 5 seconds
}

module.exports = { countConnect, checkOverLoad }