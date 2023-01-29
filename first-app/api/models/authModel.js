const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        firstNmae: {
            type: String,
            required: true
        },
        secondName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('user', userSchema)