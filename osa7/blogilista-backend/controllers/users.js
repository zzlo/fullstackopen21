const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res, next) => {
    const body = req.body

    if (!body.username || !body.password || body.password.length < 3) return res.status(400).json({ error: 'username or password invalid' })

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })
    
    try {
        const savedUser = await user.save()
        res.json(savedUser)
    } catch (exception) {
        if (exception.name === 'ValidationError') {
            return res.status(400).json({ error: exception.message })
        }
    }
})

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
    res.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter