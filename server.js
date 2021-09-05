const dotenv = require('dotenv')
const morgan = require('morgan')
const express = require('express')

const { connect } = require('./src/utils/db')
const { signup, signin } = require('./src/utils/auth')

const app = express()

dotenv.config({ path: './.env' })

app.use(express.json())
app.use(morgan('dev'))
app.use(express.static('src/public'))

app.post('/auth/signup', signup)
app.post('/auth/signin', signin)

app.get('/', (req, res) => {
    res.send('Server up and running')
})

app.listen(process.env.PORT, async () => {
    try {
        await connect()
        console.log(`Server running in http://localhost:${process.env.PORT}`)
    } catch (err) {
        console.error('Error starting server: ', err)
    }
})

module.exports = app
