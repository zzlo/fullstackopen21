const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
      title: 'HTML is easy',
      author: 'mauri pekkarinen',
      url: 'keskusta.com',
      likes: 69,
    },
    {
      title: 'HTML is hard',
      author: 'seppo kääriäinen',
      url: 'kusta.com',
      likes: 80,
    },
  ]

const getToken = async () => {
    const initialUser = {
        username: "karamelli",
        name: "kara melli",
        password: "mauritius"
    }

    await api.post('/api/users').send(initialUser)
    const response = await api.post('/api/login').send({ username: initialUser.username, password: initialUser.password})
    return response.body.token
}

beforeEach(async () => {
    await Blog.deleteMany({})
    
    for (let blog of initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(2)
})

test('the identification field of blog is defined as id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})

describe('posting a blog', () => {
    const newBlog = {
        title: "uusi",
        author: "kaksi",
        url: "lol.com",
    }

    test('increases the amount of blogs by one', async () => {
        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', 'bearer ' + await getToken())
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const response = await api.get('/api/blogs')
        const authors = response.body.map(r => r.author)

        expect(response.body).toHaveLength(initialBlogs.length + 1)
        expect(authors).toContain(
            'kaksi'
        )
    })

    test('without likes has 0 likes', async () => {
        await api
            .post('/api/blogs')
            .set('Authorization', 'bearer ' + await getToken())
            .send(newBlog)

        const response = await api.get('/api/blogs')
        expect(response.body[2].likes).toEqual(0)
    })

    test('is answered with correct status in case of missing title or url', async () => {
        const faultyBlog = {
            url: "lol.com"
        }
        let missing = false

        if (faultyBlog.author === undefined || faultyBlog.title === undefined) {
            missing = true
        }

        if (missing) {
            const response = await api.post('/api/blogs').send(faultyBlog)
            expect(response.status).toEqual(400)
        }
    })
})

afterAll(() => {
    mongoose.connection.close()
})