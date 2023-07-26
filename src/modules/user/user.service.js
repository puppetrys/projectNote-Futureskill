const UserModel = require('../../models/user/user.model')

function checkUserExit(email) {
    return UserModel.findOne({ email });
}

function createUser(firstname, lastname, email, password) {
    return UserModel.create({
        firstname,
        lastname,
        email,
        password
    })
}

module.exports = { checkUserExit, createUser }

