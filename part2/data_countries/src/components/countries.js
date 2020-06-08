import React from 'react';
import CountryName from './countryName';
import CountryFull from './countryFull';

const Countries = ({ countries }) => {
    if (countries.length > 10) {
        return <p>Too many countries, specify another filter</p>
    }

    if (countries.length === 1) {
        return <CountryFull country={countries[0]} />
    }

    return (
        countries.map((country, idx) =>
            <CountryName
                key={idx}
                country={country}
            />
        )
    )
}

export default Countries