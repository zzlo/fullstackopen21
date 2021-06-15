import React from 'react'
import { connect } from 'react-redux'
import  { notificationChange } from '../reducers/notificationReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    
    const addAnecdote = async (event) => {
        event.preventDefault()
        
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
        props.notificationChange(`you created '${content}'`, 5)
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

const mapDispatchToProps = {
    notificationChange,
    createAnecdote,
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)