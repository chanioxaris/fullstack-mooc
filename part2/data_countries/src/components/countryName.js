import React, { useState } from 'react';
import Button from './button';
import CountryFull from './countryFull';

const CountryName = ({ country }) => {
    const [showCountry, setShowCountry] = useState(false)

    const handleShow = () => setShowCountry(!showCountry)

    return (
        <div>
            <p>{country.name}</p>

            <Button
                key={country.name}
                onClick={handleShow}
                text="Show"
            />

            {showCountry ?
                <CountryFull
                    country={country}
                />
            :
                null
            }
        </div>
        )
}

export default CountryName