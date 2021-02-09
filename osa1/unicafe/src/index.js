import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const Statistics = (props) => {
  if (props.all != 0) {
    return (
      <div>
        <h2>statistics</h2>
        <table>
          <tbody>
            <StatisticLine name="good" number={props.good}/>
            <StatisticLine name="neutral" number={props.neutral}/>
            <StatisticLine name="bad" number={props.bad}/>
            <StatisticLine name="all" number={props.all}/>
            <StatisticLine name="average" number={props.average}/>
            <StatisticLine name="positive" number={props.positive} />
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <div>
        <h2>statistics</h2>
        No feedback given
      </div>
    )
  }
}

const StatisticLine = (props) => (
  <tr>
    <td>{props.name}</td>
    <td>{props.number}</td>
  </tr>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)
  
  let votes = good + bad + neutral
  let average = (good - bad) / votes
  let positive = 100 * good / votes + " %"

  const setGoodValue = () => {
    setGood(good + 1)
  }

  const setNeutralValue = () => {
    setNeutral(neutral + 1)
  }

  const setBadValue = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={setGoodValue} text="good"/>
      <Button handleClick={setNeutralValue} text="neutral"/>
      <Button handleClick={setBadValue} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad} all={votes} average={average} positive={positive} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
);