const { Schema, model, models } = require('mongoose')
const bcrypt = require('bcrypt')

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
        required: false,
        default: new Date()
    },
    role: {
        type: String,
        required: true,
        default: 'employee'
    },
    socialMedia: {
        type: Map,
        required: false
    },
    portfolio: {
        type: String,
        required: false
    },
    resume: {
        type: Buffer,
        required: false
    }
})

employeeSchema.path('email').validate(async function (email) {
    const numDocs = await models.employee.countDocuments({ email })
    return !numDocs
}, 'Email already exists')

employeeSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) return next(err)
        this.password = hash
        next()
    })
})

employeeSchema.methods.validatePassword = function (password) {
    const passwordHash = this.password
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, (err, isSame) => {
            if (err) return reject(err)
            resolve(isSame)
        })
    })
}

const Employee = model('employee', employeeSchema)

module.exports = { Employee }
