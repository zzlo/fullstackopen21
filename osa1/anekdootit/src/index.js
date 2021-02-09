import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(votesOriginal)
  const [mostVotes, setMostVotes] = useState(0)

  const clickNext = () => {
    const indeksi = Math.floor(Math.random() * anecdotes.length)
    setSelected(indeksi)
  }

  const voteAnecdote = () => {
    const copy = [ ...votes ]
    copy[selected]++
    setVotes(copy)

    if (votes[selected] + 1 > votes[mostVotes]) {
      setMostVotes(selected)
    }
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {props.anecdotes[selected]}
      <br></br>
      has {votes[selected]} votes
      <br></br>
      <button onClick={voteAnecdote}>vote</button>
      <button onClick={clickNext}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      {props.anecdotes[mostVotes]}
      <br></br>
      has {votes[mostVotes]} votes
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const votesOriginal = new Array(anecdotes.length).fill(0)

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
