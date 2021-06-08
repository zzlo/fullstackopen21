import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { notificationChange, notificationRemove } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes }) => anecdotes)
    const filter = useSelector(({ filter }) => filter)
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
    
        dispatch({
          type: 'VOTE',
          data: { id }
        })

        let anecdote = anecdotes.filter(anecdote => anecdote.id === id)
        dispatch(notificationChange(`you voted '${anecdote[0].content}'`))

        setTimeout(() => {
            dispatch(notificationRemove())
        }, 5000)
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
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList