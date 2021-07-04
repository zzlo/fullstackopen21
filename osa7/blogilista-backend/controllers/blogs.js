const notesRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

notesRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
  response.json(blogs.map(blog => blog.toJSON()))
})

notesRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.title === undefined || body.author === undefined) return response.status(400).send({})
  
  let likeAmount = body.likes

  if (likeAmount == undefined) likeAmount = 0 

  const user = await User.findById(request.user.id)
  console.log(user)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
    likes: likeAmount
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog.toJSON())
})

notesRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  console.log(blog.user.toString(), request.user._id)

  if (blog.user.toString() === request.user._id.toString()) {
    await Blog.deleteOne(blog)
    return response.status(204).end()
  }

  return response.status(401).json({ error: 'wrong id' })
})

notesRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = notesRouter