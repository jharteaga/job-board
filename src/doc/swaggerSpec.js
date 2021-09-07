const swaggerJsDoc = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Job Board REST API',
            version: '1.0.0',
            description: 'Job Board Project REST API'
        },
        servers: [
            {
                url: 'http://localhost:4500'
            }
        ]
    },
    apis: ['./src/routes/*.js', './src/doc/*.js']
}

const specs = swaggerJsDoc(options)
module.exports = specs
