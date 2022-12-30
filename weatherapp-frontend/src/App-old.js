import { useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';
import cities from 'cities.json';
import {countries as country_names} from 'countries-list'

const Filter = ({value, handler}) => {
  return (
    <>
      <div id="searchbar">
      <input id="searchbar-input" value={value} onChange={handler} autoComplete="off"/>
      <img id="searchbar-icon" src={require(`./assets/images/search-icon.png`)} alt="search" />
      </div>
      </>
  )
}

const CountryInfo = ({country, weather}) => {
  return (
    <div>
      <h3>Weather in {country.capital}</h3>
      <div>temperature {weather.main.temp} Celsius</div>
      <img className="info-img" src={require(`./assets/images/weather-icons/WeatherIcon - 2-${weather.weather[0].icon}.png`)} alt="weather" />
      {/*<img src={`/assets/images/weather-icons/WeatherIcon - 2-${weather.weather[0].icon}.png`} alt="weather"/>*/}
      <div>wind {weather.wind.speed} m/s</div>
    </div>
  )
}

const Country = ({country, setCountryFilter}) => {
  
  return (
    <>
      <div className="searchsug" onClick={() => setCountryFilter(country.name.common)}>
        <p className="p-suggestion">{country.name.common}</p>
      </div>
    </>
  )
}

const Suggestion = ({countries,setCountryFilter}) => {
  if (countries.length > 10 || countries.length === 1 ) {
    return (
      <div>
      </div>
    )
  } else if (countries.length <= 10 && countries.length > 1) {
  return (
    <div id="searchsuggestions">
      {countries.map(country => 
          <Country key={country.name.common} country={country} setCountryFilter={setCountryFilter} />
        )}
      </div>
  )
  }
}
const Countries = ({countries, setCountryFilter, weather, setLat, setLon}) => {
   if (countries.length === 1) {
    return (
      <div>
        <CountryInfo country={countries[0]} weather={weather} />
      </div>
    )
  } 
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')
  const [weather, setWeather] = useState({})
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  //const api_key = process.env.REACT_APP_API_KEY
  console.log(weather)
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
      .then(response => {
        setWeather(response.data)
      })
  }, [lat,lon])

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(countryFilter.toLowerCase()))

  useEffect(() => {
    if (countriesToShow.length === 1) {
      setLat(countriesToShow[0].capitalInfo.latlng[0])
      setLon(countriesToShow[0].capitalInfo.latlng[1])
      }
  }, [countriesToShow])

  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value)
  }
  return (
    <div>
    <div id="main-3-container">
      <div id="left-container"></div>
      <div id="middle-container">
        {(() => {
              if (Object.keys(weather).length === 0 || (lat === 0 && lon === 0) || Object.keys(countriesToShow).length !== 1 ){
                return (
                  <img id="main-box" src={require(`./assets/images/weather-icons/WeatherIcon - 2-03d.png`)} alt="weather"/>
                )
              } else {
                return (
                  <>
                  {/*<div id="main-box" style={{content: "url('./assets/images/weather-icons/WeatherIcon - 2-10d.png')"}}></div>*/}
                  <div id="header">
                    <img id="main-box" src={require(`./assets/images/weather-icons/WeatherIcon - 2-${weather.weather[0].icon}.png`)} alt="weather"/>
                    <div id="header-text"><h1>{countriesToShow[0].name.common}</h1></div>
                  </div>
                  </>
                )
              }
            })()
        }
        <div id="info-container">
        <Countries countries={countriesToShow} setCountryFilter={setCountryFilter} weather={weather} setLat={setLat} setLon={setLon}/>
        </div>
      </div>
      <div id="right-container">
          <Filter value={countryFilter} handler={handleFilterChange} />
          <Suggestion countries={countriesToShow} setCountryFilter={setCountryFilter} />
      </div> 

    </div>
    </div>
  )
}

export default App