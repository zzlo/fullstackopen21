const jwt = require('jsonwebtoken')
const User = require('../models/user')


const errorHandler = (error, req, res, next) => {
    if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'invalid token' })
    } 

    next(error)
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7)
    } else req.token = null

    next()
}

const userExtractor = async (req, res, next) => {

    if (req.token) {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)

        if (decodedToken.id) {
            req.user = await User.findById(decodedToken.id)
        }
    }

    next()
}

module.exports = { errorHandler, tokenExtractor, userExtractor }