const { assert } = require('chai')
const request = require('supertest')
const app = require('./server')

describe('GET /', function () {
    it('Server working', async function () {
        const response = await request(app).get('/').send()

        assert.equal(response.text, 'Server up and running')
    })
})

describe('POST /auth/signup', function () {
    it('Signs up a new user', async function () {
        const data = {
            email: 'userTest1@gmail.com',
            name: 'Test User Name',
            password: '123456',
            role: 'employee'
        }

        const response = await request(app)
            .post('/auth/signup')
            .set('Content-type', 'application/json')
            .send(data)
        assert.ok(response.body)
        assert.hasAnyKeys(response.body, ['token', 'error'])
    })
})

describe('POST /auth/signin', function () {
    it('Signs up a new user', async function () {
        const data = {
            email: 'userTest@gmail.com',
            password: '123456'
        }

        const response = await request(app)
            .post('/auth/signin')
            .set('Content-type', 'application/json')
            .send(data)
        assert.ok(response.body)
        assert.hasAnyKeys(response.body, 'token')
    })
})
