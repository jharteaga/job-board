const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { Employee } = require('../resources/employee/employee.model')
const User = require('../resources/user/user.model')

dotenv.config({ path: './.env' })

const newToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXP
    })
}

const signup = async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Required fields needed' })
    }

    try {
        const user = await User.create(req.body)
        const token = newToken(user)
        return res.status(201).json({ token })
    } catch (err) {
        // Duplicated email
        if (err.errors?.email?.message) {
            return res.status(400).json({ error: err.errors.email.message })
        }

        // Company information not provided
        if (err.errors?.company?.message) {
            return res
                .status(400)
                .json({ error: 'Company information is required' })
        }

        // Company name not provided
        if (err.errors?.['company.name']?.message) {
            return res.status(400).json({ error: 'Company name is required' })
        }

        // Company website not provided
        if (err.errors?.['company.website']?.message) {
            return res
                .status(400)
                .json({ error: 'Company website is required' })
        }
        return res.status(500).json({ error: err.message })
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
        const employee = await Employee.findOne({
            email: req.body.email
        }).exec()

        // Validate if employee exists
        if (!employee)
            return res.status(404).json({ message: 'Employee not found' })

        const isPasswordValid = await employee.validatePassword(
            req.body.password
        )

        // Validate if the given password matches
        if (!isPasswordValid)
            return res
                .status(401)
                .json({ message: 'Password provided is invalid' })

        const token = newToken(employee)
        return res.status(200).json({ token })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = { signup, signin }
