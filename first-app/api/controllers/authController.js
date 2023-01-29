const { generateAccessToken } = require('../utils/generateToken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require ('../models/authModel')

const register = asyncHandler ( async (req, res) => {
    const { firstNmae, secondName, email, password } = req.body

    if(!firstNmae || !secondName || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExists = await User.findOne({ email })

    if(userExists) {
        res.status(400)
        throw new Error('User laready exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        firstNmae,
        secondName,
        email,
        password: hashedPassword,
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            first_name: user.firstNmae,
            last_name: user.secondName,
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
})

const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {

        const accessToken = generateAccessToken(user.id);
        res.json({ accessToken: accessToken });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
})

module.exports = { register, login }