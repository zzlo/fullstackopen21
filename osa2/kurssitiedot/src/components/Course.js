import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
}
  
const Total = ({ course }) => {
    const sum = course.parts.reduce( (s, p) => s + p.exercises, 0)
    return (
      <p><b>total of {sum} exercises</b></p>
    ) 
}
  
const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
}
  
const Content = ({ course }) => course.parts.map(part => 
    <div key={part.id}>
      <Part part={part} />
    </div>
)
  
const Course = ({courses}) => courses.map(course => 
    <div key={course.id}>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
)

export default Course