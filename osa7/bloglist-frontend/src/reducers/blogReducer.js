import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    const blog = {
        id: action.data.id,
        title: action.data.title,
        author: action.data.author,
        url: action.data.url,
        user: action.data.user,
        likes: action.data.likes,
    }

    return state.concat(blog)
    case 'VOTE':
      const changedBlog = action.data

      return state.map(blog => blog.id !== action.data.id ? blog : changedBlog).sort((a, b) => b.likes - a.likes)
    case 'REMOVE_BLOG':
      return state.filter(blog => blog.id !== action.data)
    case 'INIT_BLOGS':
      return action.data
    default:
      return state
  }
}

export const createBlog = blog => {
    return async dispatch => {
        const newBlog = await blogService.createBlog(blog)
        console.log(newBlog)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog,
        })
    }
}

export const voteBlog = blog => {
    return async dispatch => {
        const newBlog = { ...blog, likes: blog.likes + 1 }
        await blogService.updateBlog(newBlog)
        dispatch({
            type: 'VOTE',
            data: newBlog,
        })
    }
}

export const removeBlog = id => {
    return async dispatch => {
        await blogService.deleteBlog(id)
        dispatch({
            type: 'REMOVE_BLOG',
            data: id,
        })
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
        dispatch({
            type: 'INIT_BLOGS',
            data: sortedBlogs,
        })
    }
}

export default blogReducer