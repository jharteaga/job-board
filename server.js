const dotenv = require('dotenv')
const morgan = require('morgan')
const express = require('express')
const swaggerUI = require('swagger-ui-express')

const specs = require('./src/doc/swaggerSpec')
const { apiErrorHanlder, contentTypeValidation } = require('./src/middlewares')
const { connect } = require('./src/utils/db')
const authRouter = require('./src/routes/auth.router')

const app = express()

dotenv.config({ path: './.env' })

app.use(
    '/api-docs',
    swaggerUI.serve,
    swaggerUI.setup(specs, { explorer: true })
)
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static('src/public'))

app.get('/', (req, res) => {
    res.send('Server up and running')
})

app.use(contentTypeValidation)
app.use('/auth', authRouter)
app.use(apiErrorHanlder)

app.listen(process.env.PORT, async () => {
    try {
        await connect()
        console.log(
            `Server running in http://localhost:${process.env.PORT}/api-docs`
        )
    } catch (err) {
        console.error('Error starting server: ', err)
    }
})

module.exports = app
