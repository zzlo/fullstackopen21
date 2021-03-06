import React from 'react'

const Persons = ({persons, filter, handleClick}) => {
    return (
      <div>
        {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => 
          <div key={person.name}>
            {person.name} {person.number} <button value={person.id} onClick={handleClick}>delete</button>
          </div>
        )}
      </div>
    )
}

export default Persons