import React, { useEffect, useState } from 'react';
import personService from './services/persons'
import Persons from './components/persons';
import Filter from './components/filter';
import PersonForm from './components/personForm';
import Notification from './components/notification';

const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newFilter, setNewFilter ] = useState('')
    const [ displayPersons, setDisplayPersons ] = useState([])
    const [ notification, setNotification ] = useState({message: ""})

    useEffect(() => {
        personService.getAll()
            .then(data => {
                setPersons(data)
                setDisplayPersons(data)
            })
            .catch(error => {
                setNotification({
                    message: "failed to get persons",
                    is_error: true
                })

                setTimeout(() => {
                    setNotification({message: ""})
                }, 3000)
            })
    }, [])

    const handleNewPerson = (e) => {
        e.preventDefault()

        if (persons.some(person => person.name === newName)) {
            if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                return
            }

            const existingPerson = persons.find(person => person.name === newName)
            const updatePerson = { ...existingPerson, number: newNumber}

            personService.updateObject(updatePerson)
                .then(data => {
                    const newPersons = persons.map(person => person.id !== data.id ? person : data)
                    setPersons(newPersons)
                    setDisplayPersons(newPersons)
                    setNewName("")
                    setNewNumber("")

                    setNotification({
                        message: `${newName} number successfully updated`,
                        is_error: false
                    })

                    setTimeout(() => {
                        setNotification({message: ""})
                    }, 3000)
                })
                .catch(error => {
                    setNotification({
                        message: error.response.data.error,
                        is_error: true
                    })

                    setTimeout(() => {
                        setNotification({message: ""})
                    }, 3000)
                })
            return
        }

        const newPerson = {
            name: newName,
            number: newNumber
        }

        personService.createObject(newPerson)
            .then(data => {
                setPersons(persons.concat(data))
                setDisplayPersons(displayPersons.concat(data))
                setNewName("")
                setNewNumber("")

                setNotification({
                    message: `${newPerson.name} successfully created`,
                    is_error: false
                })

                setTimeout(() => {
                    setNotification({message: ""})
                }, 3000)
            })
            .catch(error => {
                setNotification({
                    message: error.response.data.error,
                    is_error: true
                })

                setTimeout(() => {
                    setNotification({message: ""})
                }, 3000)
            })
    }
    const handleDeletePerson = (person) => {
        const {id, name} = person

        if (!window.confirm(`Delete ${name}`)) {
            return
        }

        personService.deleteObject(person.id)
            .then(data => {
                const newPersons = persons.filter(person => person.id !== id)

                setPersons(newPersons)
                setDisplayPersons(newPersons)

                setNotification({
                    message: `${person.name} successfully deleted`,
                    is_error: false
                })

                setTimeout(() => {
                    setNotification({message: ""})
                }, 3000)
            })
            .catch(error => {
                setNotification({
                    message: `failed to delete ${name}`,
                    is_error: true
                })

                setTimeout(() => {
                    setNotification({message: ""})
                }, 3000)
            })
    }

    const handleNameChange = (e) => setNewName(e.target.value)
    const handleNumberChange = (e) => setNewNumber(e.target.value)
    const handleFilterChange = (e) => {
        const newFilter = e.target.value
        const newDisplayPersons = persons.filter(person =>
            person.name.toLowerCase().includes(newFilter.toLowerCase())
        )

        setNewFilter(newFilter)
        setDisplayPersons(newDisplayPersons)
    }

    return (
        <>
            <h2>Phonebook</h2>

            <Notification
                message={notification.message}
                isError={notification.is_error}
            />

            <Filter
                onChange={handleFilterChange}
                value={newFilter}
            />

            <h3>Add new</h3>

            <PersonForm
                onSubmit={handleNewPerson}
                onChangeName={handleNameChange}
                valueName={newName}
                onChangeNumber={handleNumberChange}
                valueNumber={newNumber}
            />

            <h3>Numbers</h3>

            <Persons
                persons={displayPersons}
                handleDeletePerson={handleDeletePerson}
            />
        </>
    )
}

export default App