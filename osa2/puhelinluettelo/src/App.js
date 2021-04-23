import React, { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import numberService from './services/Numbers'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ message, setMessage ] = useState(null)

  useEffect(() => {
    numberService
      .getAll()
      .then(initialNumbers => {
        setPersons(initialNumbers)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFilterChange = (event) => setFilter(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const addContact = (event) => {
    event.preventDefault()
    let id = -1
    const filterPerson = persons.filter(person => person.name === newName)

    const personObject = {
      name: newName,
      number: newNumber,
    }

    if (filterPerson.length === 1) {
      id = filterPerson[0].id
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        numberService
          .update(id, personObject)
          .then(updatedNumber => {
            setPersons(persons.map(person => person.id !== id ? person : updatedNumber))
          })
          .catch(error => {
            setMessage(`Information of ${newName} has already been deleted from server`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
        
        setMessage(`Updated ${newName}'s number`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    } else {
      numberService
        .create(personObject)
        .then(person => {
          setPersons(persons.concat(person))
          setMessage(`Added ${newName}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMessage(`${error.response.data.error}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      setNewName('')
      setNewNumber('')
    }
  }

  const deleteContact = (event) => {
    event.preventDefault()

    const id = event.target.value
    const name = persons.find(person => person.id == id).name

    if (window.confirm(`Delete ${name}`)) {
      numberService
        .deleteObject(id)

      setPersons(persons.filter(person => person.id != id))
      setMessage(`Deleted ${name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter handleFilterChange={handleFilterChange} filter={filter}/>
      <h2>add a new</h2>
      <PersonForm addContact={addContact} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleClick={deleteContact}/>
    </div>
  )

}

export default App