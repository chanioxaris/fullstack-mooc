import React from 'react';
import Button from './button';

const Person = ({ person, onClick }) => {
    return (
        <div>
            <p>{person.name} {person.number}</p>

            <Button
                onClick={() => onClick(person)}
                text="Delete"
            />
        </div>
    )
}

export default Person