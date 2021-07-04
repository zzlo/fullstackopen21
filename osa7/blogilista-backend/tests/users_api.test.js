const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: "grillimestari", name: "timo kulli", passwordHash: "3geokg3g3gkgnwkg"})

    await user.save()
})

test('creation fails with correct statuscode and message if username already taken', async () => {
    const startUsers = await helper.usersInDb()

    const newUser = {
        username: "grillimestari",
        name: "timo karjamaa",
        password: "salainen"
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const endUsers = await helper.usersInDb()
    expect(endUsers).toHaveLength(startUsers.length)
})

test('creation fails with correct statuscode and message if password or username is invalid', async () => {
    const startUsers = await helper.usersInDb()

    const newUser = {
        name: "timo karjamaa",
        password: "salainen"
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username or password invalid')

    const endUsers = await helper.usersInDb()
    expect(endUsers).toHaveLength(startUsers.length)

    console.log(endUsers.length)
})

test('creation succeeds with a valid user', async () => {
    const startUsers = await helper.usersInDb()

    const newUser = {
        username: "mestari",
        name: "kalevi koivisto",
        password: "salainen"
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    const endUsers = await helper.usersInDb()
    expect(endUsers).toHaveLength(startUsers.length + 1)

    const usernames = endUsers.map(u => u.username)
    expect(usernames).toContain(newUser.username)
})

afterAll(() => {
    mongoose.connection.close()
})