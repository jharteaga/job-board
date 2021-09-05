const { Schema, model, models } = require('mongoose')
const bcrypt = require('bcrypt')

const companySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    }
})

const employerSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    },
    role: {
        type: String,
        required: true,
        default: 'employer'
    },
    company: {
        type: companySchema,
        required: true
    },
    socialMedia: {
        type: Map,
        required: false
    }
})

employerSchema.path('email').validate(async function (email) {
    const numDocs = await models.employer.countDocuments({ email })
    return !numDocs
}, 'Email already exists')

employerSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) return next(err)
        this.password = hash
        next()
    })
})

employerSchema.methods.validatePassword = function (password) {
    const passwordHash = this.password
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, (err, isSame) => {
            if (err) return reject(err)
            resolve(isSame)
        })
    })
}

const Employer = new model('employer', employerSchema)

module.exports = { Employer }
