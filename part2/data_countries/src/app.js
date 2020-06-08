import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Filter from './components/filter';
import Countries from './components/countries';

const App = () => {
    const [countries, setCountries] = useState([])
    const [displayCountries, setDisplayCountries] = useState([])
    const [filter, setFilter] = useState("")

    const handleFilterChange = (e) => {
        const newFilter = e.target.value

        const newDisplayCountries = countries.filter(country =>
            country.name.toLowerCase().includes(newFilter.toLowerCase())
        )

        setFilter(newFilter)
        setDisplayCountries(newDisplayCountries)
    }

    useEffect(() => {
        axios.get("https://restcountries.eu/rest/v2/all")
            .then(response => setCountries(response.data))
    }, [])

    return(
        <div>
            <Filter
                onChange={handleFilterChange}
                value={filter}
            />

            <Countries
                countries={displayCountries}
            />
        </div>
    )
}

export default App