import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import New from './components/New'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch } from 'react-redux'
import { notificationChange, notificationRemove } from './reducers/notificationReducer'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')

      dispatch(notificationChange('logged in successfully'))
      setTimeout(() => {
        dispatch(notificationRemove())
      }, 5000)
    } catch (exception) {
      dispatch(notificationChange('wrong username or password'))
      setTimeout(() => {
        dispatch(notificationRemove())
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(notificationChange('logged out succesfully'))
    setTimeout(() => {
      dispatch(notificationRemove())
    }, 5000)
  }

  const handleCreation = async (blogObject) => {
    try {
      await blogService.createBlog(blogObject)
      blogObject.id = blogObject.title
      blogObject.user = user
      const sortedBlogs = blogs.concat(blogObject).sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
      blogFormRef.current.toggleVisibility()
      dispatch(notificationChange('a new blog created succesfully'))
      setTimeout(() => {
        dispatch(notificationRemove())
      }, 5000)
    } catch (exception) {
      dispatch(notificationChange('blog creation failed'))
      setTimeout(() => {
        dispatch(notificationRemove())
      }, 5000)
    }
  }

  const handleUpdating = async blogObject => {
    const newBlog = { ...blogObject, likes: blogObject.likes + 1 }

    try {
      await blogService.updateBlog(newBlog)
      const filteredBlogs = blogs.filter(blog => blog.id !== blogObject.id).concat(newBlog)
      const sortedBlogs = filteredBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    } catch (exception) {
      console.log(exception)
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification/>
        <Login handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
      </div>
    )
  }

  const handleDeletion = async (id) => {
    try {
      await blogService.deleteBlog(id)
      const filteredBlogs = blogs.filter(blog => blog.id !== id)
      const sortedBlogs = filteredBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification/>
      <div>{user.name} logged in</div>
      <form onSubmit={handleLogout}>
        <button type="submit">logout</button>
      </form> <br/>
      <Togglable buttonLabel="new blog" cancelLabel="cancel" ref={blogFormRef}>
        <New handleCreation={handleCreation}/>
      </Togglable>
      <br/>
      {blogs.map(blog =>
        <Blog handleDeletion={handleDeletion} user={user} key={blog.id} handleUpdating={handleUpdating} blog={blog} />
      )}
    </div>
  )
}

export default App