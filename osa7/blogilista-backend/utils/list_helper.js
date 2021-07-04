const dummy = (blogs) => {
    return 1
}

const totalLikes = ( blogs ) => {
    const likes = blogs.reduce(((sum, current) => sum + current.likes), 0)

    return likes
}

const favoriteBlog = ( blogs ) => {
    let favorite = {}
    let highest = 0

    blogs.forEach(blog => {
        if (blog.likes >= highest) {
            favorite = blog
            highest = blog.likes
        }
    })

    return favorite
}

const mostBlogs = ( blogs ) => {
    if (blogs.length === 0) {
        return {}
    }

    let authors = new Map()
    let most = ''
    let highest = 0

    blogs.forEach(blog => {
        authors.has(blog.author)
            ? authors.set(blog.author, authors.get(blog.author) + 1)
            : authors.set(blog.author, 1) 
    })

    for (let [key, value] of authors) {
        if (value >= highest) {
            highest = value
            most = key
        }
    }

    return { author: most, blogs: authors.get(most)}
}

const mostLikes = ( blogs ) => {
    if (blogs.length === 0) {
        return {}
    }

    let authors = new Map()
    let most = ''
    let highest = 0

    blogs.forEach(blog => {
        authors.has(blog.author)
            ? authors.set(blog.author, authors.get(blog.author) + blog.likes)
            : authors.set(blog.author, blog.likes) 
    })

    for (let [key, value] of authors) {
        if (value >= highest) {
            highest = value
            most = key
        }
    }

    return { author: most, likes: authors.get(most)}
}

module.exports = { 
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}