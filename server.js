const dotenv = require('dotenv')
const morgan = require('morgan')
const express = require('express')

const app = express()

dotenv.config({ path: './.env' })

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send('Server up and running')
})

app.listen(process.env.PORT, () => {
    console.log(`Server running in http://localhost:${process.env.PORT}`)
})
