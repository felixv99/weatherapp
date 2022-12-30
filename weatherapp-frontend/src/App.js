import { useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';
import cityService from './services/cities'
import favoritesService from './services/favorites'
import loginService from './services/login'
//import cities_data from 'cities.json';
//import {countries as country_names} from 'countries-list'
import {Filter, Cities, Suggestion, Menu} from './components/City'
//const cities_data = require('./data/cities.json')

const App = () => {
  const [cities, setCities] = useState([]);
  const [cityFilter, setCityFilter] = useState('');
  const [weather, setWeather] = useState({});
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showMenu, setShowMenu] = useState('closed')
  const [favorites, setFavorites] = useState([])
  //const api_key = process.env.REACT_APP_API_KEY
  //console.log(weather)
  /*
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCities(response.data)
      })
  }, [])
*/

  useEffect(() => {
    cityService.getAll().then(cities =>
      setCities(cities)
    ) 

  }, [cityFilter])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedWeatherappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      favoritesService.setToken(user.token)
      //console.log(user)
      favoritesService.getFavorites(user.username).then(favcities => setFavorites(favcities))
    }
  }, [])

  useEffect(() => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
      .then(response => {
        setWeather(response.data)
      })
  }, [lat,lon])
  //TO DO , Add country names in the cities object or search the countrycode from the countries_data list
  //Tähän kaupunki lisäks??
  //const citiesToShow = cities.filter(city => city.name.toLowerCase().includes(cityFilter.toLowerCase()))
  //const citiesToShow = cities.filter(city => (city.name + " " + country_names[city.country].name).toLowerCase().includes(cityFilter.toLowerCase()))
  //const citiesToShow = cities.filter(city => (city.name + " " + country_names[city.country].name).toLowerCase().startsWith(cityFilter.toLowerCase()))
    const citiesToShow = cities.filter(city => (city.name + " " + city.country + " " + city.id).toLowerCase().startsWith(cityFilter.toLowerCase()))

  useEffect(() => {
    if (citiesToShow.length === 1) {
      setLat(citiesToShow[0].lat)
      setLon(citiesToShow[0].lng)
      }
  }, [citiesToShow])

  const handleFilterChange = (event) => {
    setCityFilter(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedWeatherappUser', JSON.stringify(user)
      ) 
      favoritesService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setShowMenu('auth-open')
      favoritesService.getFavorites(user.username).then(favcities => setFavorites(favcities))
      //favoritesService.getFavorites(user.username).then(favcities => setFavorites(favcities))
    } catch (exception) {
      /*errormsg('wrong username or password')*/
      console.log(exception)
    }
    console.log('logging in with', username, password)
  }

  const handleSignUp = async (event) => {
    event.preventDefault()
    try {
      await loginService.signUp({
        username, password,
      })

      setUsername('')
      setPassword('')
      setShowMenu('open')
      //favoritesService.getFavorites(user.username).then(favcities => setFavorites(favcities))
    } catch (exception) {
      /*errormsg('wrong username or password')*/
      console.log(exception)
    }
  }

  const menuHandler = (event) => {
    event.preventDefault()
    if (showMenu === 'closed' && user === null) {
      setShowMenu('open')
    } else if (showMenu === 'open'|| showMenu === 'auth-open' || showMenu === 'reg-open') {
      setShowMenu('closed')
    } else if (showMenu === 'closed' && user !== null)
    setShowMenu('auth-open')
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedWeatherappUser')
    favoritesService.setToken(null)
    setUser(null)
    setUsername('')
    setPassword('')
    setShowMenu('closed')
  }

  const addFavorite = async (event) => {
    event.preventDefault()
    //console.log({id: citiesToShow[0].id})
      try {
      const favObject = {id: citiesToShow[0].id}
      const returnedUser = await favoritesService.addFavorite(favObject)
      console.log(returnedUser)
      setFavorites(returnedUser.cities)
      } catch (exception) {
        console.log(exception.message)
      }
  }

  const removeFavorite = async () => {
    console.log("POISTHA")
    
    try {
      const returnedCities = await favoritesService.deleteFavorite(user.username, citiesToShow[0].id, favorites)
      setFavorites(returnedCities.cities)
      } catch (exception) {
        console.log(exception.message)
      }
      
  }

  return (
    <div>
    <div id="main-3-container">
      <div id="left-container">
        <Menu handleLogin={handleLogin} handleSignUp={handleSignUp} setShowMenu={setShowMenu} setUsername={setUsername} setPassword={setPassword} username={username} password={password} showMenu={showMenu} menuHandler={menuHandler} user={user} logOut={logOut} favorites={favorites} setCityFilter={setCityFilter}/>
      </div>
      <div id="middle-container">
        {(() => {
              if (Object.keys(weather).length === 0 || (lat === 0 && lon === 0) || Object.keys(citiesToShow).length !== 1 ){
                return (
                  <div id="header">
                  <img id="main-box" src={require(`./assets/images/weather-icons/WeatherIcon - 2-03d.png`)} alt="weather"/>
                  </div>
                )
              } else {
                return (
                  <>
                  {/*<div id="main-box" style={{content: "url('./assets/images/weather-icons/WeatherIcon - 2-10d.png')"}}></div>*/}
                  <div id="header">
                    <img id="main-box" src={require(`./assets/images/weather-icons/WeatherIcon - 2-${weather.weather[0].icon}.png`)} alt="weather"/>
                    <div id="header-text">
                      <h1>{citiesToShow[0].name}</h1>
                      { user === null ? "" :
                      (favorites.find( city => city.id === citiesToShow[0].id) 
                        ?
                       <div className="favorite-button" onClick={(removeFavorite)}>
                       	&#10084;</div>
                        :
                      <div className="favorite-button" onClick={(addFavorite)}>
                        <div className="plus1"></div>
                        <div className="plus2"></div>
                      </div>
                       ) 
                       }
                    </div>
                  </div>
                  </>
                )
              }
            })()
        }
        <div id="info-container">
          <Cities cities={citiesToShow} setCityFilter={setCityFilter} weather={weather} setLat={setLat} setLon={setLon} /*countries={country_names}*//>
        </div>
      </div>
      <div id="right-container">
          <Filter value={cityFilter} handler={handleFilterChange} />
          <Suggestion cities={citiesToShow} setCityFilter={setCityFilter} /*countries={country_names}*/ setCities={setCities} />
      </div> 

    </div>
    </div>
  )
}

export default App