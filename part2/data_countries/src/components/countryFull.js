import React from 'react';
import CityWeather from './cityWeather';
import Image from './image';

const CountryFull = ({ country }) => {
    return (
        <div>
            <div>
                <h2>{country.name}</h2>
            </div>
            <div>
                Capital: {country.capital}
            </div>
            <div>
                Population: {country.population}
            </div>

            <h3>Languages</h3>
            <ul>
                {country.languages.map(language =>
                    <li key={language.name}>{language.name}</li>
                )}
            </ul>

            <Image
                src={country.flag}
                alt="flag"
                height={100}
                width={100}
            />

            <CityWeather
                city={country.capital}
            />
        </div>
    )
}

export default CountryFull