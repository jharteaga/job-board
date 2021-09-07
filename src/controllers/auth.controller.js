const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const User = require('../models/user.model')
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
            next(ApiError.conflict(messages.EMAIL_DUPLICATE_ERROR))
            return
        }

        // General validation error
        next(ApiError.badRequest(err.message))
        return
    }
}

const signin = async (req, res, next) => {
    const { email, password } = req.body

    // Validate if email and password were provided
    if (!email || !password) {
        next(ApiError.badRequest(messages.REQUIRED_FIELDS))
        return
    }

    try {
        const user = await User.findOne({
            email: req.body.email
        }).exec()

        // Validate if user exists
        if (!user) {
            next(ApiError.notFound(messages.USER_NOT_FOUND))
            return
        }

        const isPasswordValid = await user.validatePassword(req.body.password)

        // Validate if the given password matches
        if (!isPasswordValid) {
            next(ApiError.notAuthorized(messages.NOT_AUTH))
            return
        }

        const token = newToken(user)
        return res
            .status(200)
            .json(
                new Response(
                    { token },
                    { name: user.name, email: user.email, role: user.role },
                    []
                )
            )
    } catch (err) {
        next(ApiError.internalServer(err.message))
    }
}

module.exports = { signup, signin }
