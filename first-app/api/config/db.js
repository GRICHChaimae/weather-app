const mongoose = require('mongoose')

const connectDB = async () => {
    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.MONGODB_URI, {
        dbName: process.env.DB_NAME,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('mongoDB connected ...')).catch(err => {
        console.log('Mongo DB connection error ...')
        console.log(err.messsage)
    })
}

module.exports = connectDB