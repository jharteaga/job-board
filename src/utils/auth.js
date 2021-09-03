const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { Employee } = require('../resources/employee/employee.model')

dotenv.config({ path: './.env' })

const newToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXP
    })
}

const signup = async (req, res) => {
    const { name, email, password, role } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Required fields needed' })
    }

    try {
        if (role === 'employee') {
            const user = await Employee.create(req.body)
            const token = newToken(user)
            return res.status(201).json({ token })
        } else {
            console.log('role: ', role)
            return res.status(404).json({ message: 'Invalid role' })
        }
    } catch (err) {
        if (err.errors?.email.message) {
            return res.status(400).json({ error: err.errors.email.message })
        } else {
            return res.status(500).json({ error: err.message })
        }
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
