const { Schema, model, models } = require('mongoose')
const bcrypt = require('bcrypt')

const companySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Company name is required']
    },
    website: {
        type: String,
        required: [true, 'Company website is required']
    }
})

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            minLength: 1,
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        role: {
            type: String,
            required: [true, 'Role is required'],
            enum: {
                values: ['employee', 'employer'],
                message: '{VALUE} is not supported'
            }
        },
        company: {
            type: companySchema,
            required: [
                function () {
                    return this.role === 'employer'
                },
                'Company information is required'
            ]
        },
        portfolio: String,
        socialMedia: Map
    },
    { timestamps: true }
)

userSchema.path('email').validate(async function (email) {
    const numDocs = await models.user.countDocuments({ email })
    return !numDocs
}, 'Email already exists')

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) return next(err)
        this.password = hash
        next()
    })
})

userSchema.methods.validatePassword = function (password) {
    const passwordHash = this.password
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, (err, isSame) => {
            if (err) return reject(err)
            resolve(isSame)
        })
    })
}

const User = model('user', userSchema)
module.exports = User
