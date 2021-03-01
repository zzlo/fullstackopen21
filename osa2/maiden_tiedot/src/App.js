import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ( {filter, onFilterChange} ) => 
  <div>
    find countries <input value={filter} onChange={onFilterChange}/>
  </div>

const ShowData = ( {countries, filter, handleClick, specificCountry, show, weather} ) => {
  if (filter !== '') {
    const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

    if (filteredCountries.length > 10) {
      return <div>too many matches, specify another filter</div>
    } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
      return filteredCountries.map(country => {
        if (specificCountry === country.name && show) {
          return (
            <div key={country.population}>
              {country.name}
              <button value={country.name} onClick={handleClick}>hide</button>
              <CountryData country={country} weather={weather}/>
            </div>
          )
        } else {
          return (
            <div key={country.population}>
              {country.name}
              <button value={country.name} onClick={handleClick}>show</button>
            </div>
          )
        }
      })
    } else if (filteredCountries.length === 1) {
      return <CountryData country={filteredCountries[0]} weather={weather}/>
    } else {
      return <div>no countries found</div>
    }
  } else {
    return <div></div>
  }
}

const WeatherData = ( {weather} ) => 
  <div>
    <h3>Weather in {weather.location.name}</h3>
    <b>temperature: </b> {weather.current.temperature} celsius
    <img src={weather.current.weather_icons[0]} alt="weather image" width="200" height="200" />
    <br/><b>wind: </b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}
  </div>

const CountryData = ( {country, weather} ) => {
  return (
    <div>
      <h2>{country.name}</h2>
      capital {country.capital}
      <br/>population {country.population}
      <br/><h3>languages</h3>
      <ul>{country.languages.map((language, i) => <li key={i}>{language.name}</li>)}</ul>
      <img src={country.flag} alt="flag" width="250" height="200"/>
      <WeatherData weather={weather}/>
      <br/>
    </div>
  )
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')
  const [ show, setShow ] = useState(false)
  const [ country, setCountry ] = useState([])
  const [ weather, setWeather ] = useState([])

  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  useEffect(() => {
    if (country.capital === undefined) {
      axios
        .get('http://api.weatherstack.com/current?access_key=' + api_key + '&query=helsinki')
        .then(response => {
          setWeather(response.data)
        })
    } else {
      axios
        .get('http://api.weatherstack.com/current?access_key=' + api_key + '&query=' + country.capital)
        .then(response => setWeather(response.data))
    }
  }, [country])

  const onFilterChange = (event) => {
    setFilter(event.target.value)
    setShow(false)

    const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase()))
    if (filteredCountries.length===1) setCountry(filteredCountries[0])
  }

  const handleClick = (event) => {
    event.preventDefault()
    setShow(!show)

    const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase()))

    setCountry(filteredCountries[0])
  }

  return (
    <div>
      <Filter filter={filter} onFilterChange={onFilterChange}/>
      <ShowData countries={countries} filter={filter} handleClick={handleClick} specificCountry={country.name} show={show} weather={weather}/>
    </div>
  )
}

export default App;