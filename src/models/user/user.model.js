const Schema = require('mongoose').Schema
const Model = require('mongoose').model

const UserSchema = new Schema({
    firstname: {
        type: String,
        default: null
    },
    lastname: {
        type: String,
        default: null
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    token: {
        type: String
    }
})

const UserModel = Model('user', UserSchema)
module.exports = UserModel