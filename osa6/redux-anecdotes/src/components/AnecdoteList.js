import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, notificationRemove } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes }) => anecdotes)
    const filter = useSelector(({ filter }) => filter)
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        const id = anecdote.id

        console.log('vote', id)
    
        dispatch(voteAnecdote(anecdote))

        dispatch(notificationChange(`you voted '${anecdote.content}'`, 5))
    }

    return (
        <div>
            {anecdotes.filter(anecdote => anecdote.content.includes(filter)).map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList