const mongoose = require('mongoose')
const dotenv = require('dotenv')
const { format } = require('util')

dotenv.config({ path: './.env' })

const connect = (url = process.env.DB_URL, opts = {}) => {
    return mongoose.connect(url, { ...opts, useNewUrlParser: true })
}

module.exports = { connect }
