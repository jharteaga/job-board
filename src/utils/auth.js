const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const User = require('../resources/user/user.model')
const ApiError = require('../utils/ApiError')
const messages = require('../utils/messages')
const Response = require('../utils/Response')

dotenv.config({ path: './.env' })

const newToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXP
    })
}

const signup = async (req, res, next) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        next(ApiError.badRequest(messages.REQUIRED_FIELDS))
        return
    }

    try {
        const user = await User.create(req.body)
        const token = newToken(user)
        return res.status(201).json(new Response({ token }, {}, []))
    } catch (err) {
        // Duplicated email
        if (err.errors?.email?.message) {
            next(ApiError.conflict(`Email ${messages.DUPLICATE_ERROR}`))
            return
        }

        // General validation error
        next(ApiError.badRequest(err.message))
        return
    }
}

const signin = async (req, res) => {
    const { email, password } = req.body

    // Validate if email and password were provided
    if (!email || !password) {
        return res
            .status(400)
            .json({ message: 'Email and password must be provided' })
    }

    try {
        const user = await User.findOne({
            email: req.body.email
        }).exec()

        // Validate if user exists
        if (!user) return res.status(404).json({ message: 'User not found' })

        const isPasswordValid = await user.validatePassword(req.body.password)

        // Validate if the given password matches
        if (!isPasswordValid)
            return res
                .status(401)
                .json({ message: 'Password provided is invalid' })

        const token = newToken(user)
        return res.status(200).json({ token })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = { signup, signin }
