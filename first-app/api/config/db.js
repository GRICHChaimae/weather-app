const mongoose = require('mongoose')

const connectDB = async () => {
    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.MONGODB_URI).then(() => console.log('mongoDB connected ...')).catch(err => {
        console.log('Mongo DB connection error ...')
        console.log(err.messsage)
    })
}

module.exports = connectDB