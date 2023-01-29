const express = require('express')
require('dotenv').config()
const { errorHandler } = require('./middlewares/errorMiddleware')
const cors =  require('cors')
const port = process.env.PORT || 8000
const connectDB = require('./config/db')
connectDB()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1/user', require('./routes/authRoutes'))

app.use(errorHandler)
app.listen(port, console.log(`Server running on port ${port}`))