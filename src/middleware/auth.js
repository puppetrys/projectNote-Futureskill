const jwt = require('jsonwebtoken')

const config = process.env

const verifyToken = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization']

    if (token === undefined) {
        return res.status(401).send({ "error": "Token is not present" })
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.lenght)
    }

    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }

    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY)
        req.user = decoded
    } catch (error) {
        return res.status(401).send('Invalid Token')
    }

    return next()
}

module.exports = verifyToken