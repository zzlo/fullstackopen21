import React from 'react'
import PropTypes from 'prop-types'
import Togglable from './Togglable'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const isUsersBlog = (user, blog) => {
  return user.username === blog.user.username
}

const Remove = ({ deleteBlog }) => (
  <div>
    <form onSubmit={deleteBlog}>
      <button type="submit">remove</button>
    </form>
  </div>
)

const Blog = ({ user, blog, handleUpdating, handleDeletion }) => {
  const putBlog = async (event) => {
    event.preventDefault()

    handleUpdating(blog)
  }

  const deleteBlog = async (event) => {
    event.preventDefault()

    if (!window.confirm(`Remove blog ${blog.title} ${blog.author}`)) return
    handleDeletion(blog.id)
  }

  return (
    <div className="blog" style={blogStyle}>
      <div className="name">
        {blog.title} {blog.author}
      </div>
      <Togglable buttonLabel="view" cancelLabel="hide">
        <div>
          {blog.url}
        </div>
        <div>
          likes <span id="likes">{blog.likes}</span>
          <form onSubmit={putBlog}>
            <button className="like" type="submit">like</button>
          </form>
        </div>
        <div>{blog.user.name}</div>
        {isUsersBlog(user, blog) ? <Remove deleteBlog={deleteBlog}/> : <span></span>}
      </Togglable>
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  handleUpdating: PropTypes.func.isRequired,
  handleDeletion: PropTypes.func.isRequired
}

export default Blog