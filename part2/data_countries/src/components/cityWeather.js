import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Image from './image';

const CityWeather = ({ city }) => {
    const api_key = process.env.REACT_APP_API_KEY

    const [weather, setWeather] = useState({})

    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`)
            .then(response => setWeather(response.data))
    }, [api_key, city])

    if (!Object.keys(weather).length) {
        return null
    }

    return (
        <div>
            <h3>Weather in {city}</h3>

            <p><b>Temperature:</b> {weather.current.temperature} Celcius</p>
            <p><b>Wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>

            {weather.current.weather_icons.map((icon, idx) =>
                <Image
                    key={idx}
                    src={icon}
                    alt="icon"
                    height={50}
                    width={50}
                />
            )}
        </div>
    )
}

export default CityWeather
