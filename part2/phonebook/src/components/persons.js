import React from 'react';
import Person from './person';

const Persons = ({ persons, handleDeletePerson }) => {
    return (
        persons.map(person =>
            <Person
                key={person.id}
                person={person}
                onClick={handleDeletePerson}
            />
        )
    )
}

export default Persons