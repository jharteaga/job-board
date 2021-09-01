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
        return res.status(err.status).json({ error: err.message })
    }
}

module.exports = { signup }
