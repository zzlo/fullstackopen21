import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    console.log(response.data)
    return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0}
    const response = await axios.post(baseUrl, object)
    return response.data
}

const addVote = async (anecdote) => {
    const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
    await axios.put(`${baseUrl}/${anecdote.id}`, newAnecdote)
}

export default { 
    getAll,
    createNew,
    addVote
}