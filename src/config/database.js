const mongoose = require('mongoose')

const { MONGO_URI } = process.env

exports.connect = async () => {
    mongoose.set('strictQuery', true)
    await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log('Successfully connectd to database')
        }).catch((error) => {
            console.log('Error connectd to database')
            console.log(error)
            process.exit(1)
        })
}