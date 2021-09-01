const { Schema, model } = require('mongoose')

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: false
    },
    role: {
        type: String,
        required: true,
        default: 'employee'
    },
    socialMedia: {
        type: Array,
        required: false
    },
    portfolio: {
        type: String,
        required: false
    }
})

const Employee = model('employee', employeeSchema)

module.exports = { Employee }
