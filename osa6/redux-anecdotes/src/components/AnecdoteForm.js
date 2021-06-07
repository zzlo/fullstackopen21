import React from 'react'

const AnecdoteForm = ( {dispatch} ) => {
    const generateId = () => {
        Number((Math.random() * 1000000).toFixed(0))
    }

    const createAnecdote = (content) => {
        return {
          type: 'NEW_ANECDOTE',
          data: {
            content,
            votes: 0,
            id: generateId()
          }
        }
    }
    
    const addAnecdote = (event) => {
        event.preventDefault()
        
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote"/></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm