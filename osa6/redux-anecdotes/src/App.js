import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  return (
    <div>
      <AnecdoteList anecdotes={anecdotes} dispatch={dispatch}/>
      <AnecdoteForm dispatch={dispatch}/>
    </div>
  )
}

export default App