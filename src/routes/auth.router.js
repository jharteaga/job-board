const { Router } = require('express')
const router = Router()

const { signup, signin } = require('../controllers/auth.controller')
require('../doc/auth.doc')

router.post('/signin', signin)
router.post('/signup', signup)

module.exports = router
