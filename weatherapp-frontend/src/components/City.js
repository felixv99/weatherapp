import '../App.css'

// This component handles the city search query
const Filter = ({value, handler}) => {
    return (
      <>
        <div id="searchbar">
        <input id="searchbar-input" value={value} onChange={handler} autoComplete="off" />
        <img id="searchbar-icon" src={require(`../assets/images/search-icon.png`)} alt="search" />
        </div>
        </>
    )
  }

// This component is in charge of displaying the specific city's weather data
  const CityInfo = ({city, weather}) => {
    const w_desc = weather.weather[0].description
    const w_desc_fix = w_desc.charAt(0).toUpperCase() + w_desc.slice(1).toLowerCase();
    return (
      <>
        <h3 style={{margin:"0px",padding:"2px"}}>Current weather in {city.name}, {city.country}</h3>
        <div className="info-container-row">
          <div className="info-tab" style={{height: "150px", border:"none", background: "none", gap:"2px"}}>
              <div className="tab-part" style={{ alignItems: "start", gap:"10px"}}>
                 <h1 className="info-tab-inner" style={{height:"50%"}}>{weather.main.temp}&deg;C</h1>
                 <div className="info-tab-inner">
                    <p className="p-tab">{w_desc_fix}</p>
                    <p className="p-tab">wind {weather.wind.speed} m/s</p>
                </div>
              </div>
          </div>
          <div className="info-tab" style={{height: "150px"}}>
             <img className="info-img" src={require(`../assets/images/weather-icons/WeatherIcon - 2-${weather.weather[0].icon}.png`)} alt="weather" />
          </div>
        </div>
        {/* Javascript date object uses milliseconds instead of seconds*/}
        <div className="info-container-row">
          <div className="info-tab">
            <div className="tab-part">
              <img className="tab-part-img" src={require(`../assets/images/WeatherIcon - 1-24.png`)} alt="sunrise" />
              <p className="p-tab">{new Date((weather.sys.sunrise-(60*60*2)+weather.timezone)*1000).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</p>
            </div>
            <div className="tab-part"> 
              <img className="tab-part-img" src={require(`../assets/images/WeatherIcon - 1-23.png`)} alt="sunset" />
              <p className="p-tab">{new Date((weather.sys.sunset-(60*60*2)+weather.timezone)*1000).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</p>
            </div>
          </div>
          <div className="info-tab">
            <div className="tab-part">
              <h3 className="tab-part-img">Min</h3>
              <p className="p-tab">{weather.main.temp_min} &deg;C</p>
            </div>
            <div className="tab-part"> 
              <h3 className="tab-part-img">Max</h3>
              <p className="p-tab">{weather.main.temp_max} &deg;C</p>
            </div>
          </div>
        </div>
      </>
    )
  }
  
//This component handles the drop-down suggestions when searching for a city
  const City = ({city, setCityFilter}) => {
    return (
      <>
        <div className="searchsug" onClick={() => {
          setCityFilter({name: city.name, country: city.country, id: city.id})
          }}>
          <p className="p-suggestion">{city.name}</p><p className="p-suggestion-light"> {city.country} </p>
        </div>
      </>
    )
  }
  
//This component is a parent component for the drop-down suggestions, handling logic such as how many suggestions are showed
  const Suggestion = ({cities,setCityFilter/*, countries*/,setCities}) => {
    if (cities.length > 20 || cities.length === 1 ) {
      return (
        <div>
        </div>
      )
    } else if (cities.length <= 20 && cities.length > 1) {
    return (
      <div id="searchsuggestions">
        {cities.map(city =>
            <City key={city.id} city={city} setCityFilter={setCityFilter} setCities={setCities} />
        )}
        </div>
    )
    }
  }

//This component handles individual favourite city buttons
  const FavoriteCity = ({city, setCityFilter}) => {
    return (
        <>
        <div className="login-inputs" style={{height: "auto", width: "100%", minWidth: "30px",padding: "0px", display:"flex", flexDirection: "column", gap: "0px", cursor: "pointer"}} onClick={() => {
          setCityFilter({name: city.name, country: city.country, id: city.id})
          }}>
          <p className="p-suggestion" style={{ margin:"3px"}}>{city.name}</p><p className="p-suggestion-light" style={{ margin: "3px"}}> {city.country} </p>
        </div>
         </>
      )
  }

//This component handles the favourite cities buttons, which can be accessed after user has logged in
  const FavoriteCities = ({cities, setCityFilter}) => {
    if (cities.length === 0 ) {
        return (
          <>
            <p className="p-tab">Search and add cities to favorites to have a quick access to them from here</p>
          </>
        )
      } else {
      return (
        <div id="favs-container">
          {cities.map(city =>
              <FavoriteCity key={city.id} city={city} setCityFilter={setCityFilter}/>
          )}
          </div>
      )
      }
  }

// This component handles whether the specific city info is shown or not
  const Cities = ({cities, weather}) => {
     if (cities.length === 1) {
      return (
        <>
          <CityInfo city={cities[0]} weather={weather}/>
        </>
      )
    } else {
      return (
        <>
        <h2>Welcome to weather app!</h2>
        <p className="p-tab">Start by searching for a city from the right upper corner</p>
        </>
        )
    }
  }

// This component handles the whole menu logic, from signing up, signing in, and showing favourite cities as well as showing the minimized menu button
  const Menu = ({handleLogin, handleSignUp, setShowMenu, setUsername, setPassword, username, password, showMenu, menuHandler, user, logOut, favorites, setCityFilter}) => {
    if(showMenu === 'closed') {


    return (
        <>
          <div id="menu-button" onClick={(menuHandler)}>
            <div className="menu-button-lines"></div>
            <div className="menu-button-lines"></div>
          </div>
          </>
    )
    } else if (showMenu === 'open') {
        return (
        <div id="login-container">
        <form id="form-container" onSubmit={handleLogin}>
            <h3 style={{margin:"0px",padding:"2px", position: "absolute", top: "10px"}}>Sign in</h3>
            <div id="x-button" onClick={(menuHandler)}><div className="x1"></div><div className="x2"></div></div>
            <p className="p-tab" style={{fontSize: "12px", marginRight: "auto"}}>Username</p>
            <input className="login-inputs" type="text" value={username} name="Username" onChange={({target}) => setUsername(target.value)} />
            <p className="p-tab" style={{fontSize: "12px", marginRight: "auto"}}>Password</p>
            <input className="login-inputs" type="password" value={password} name="Password" onChange={({target}) => setPassword(target.value)} />
            <button type="submit">Sign in</button>
          </form>
          <p className="p-tab" style={{fontSize: "12px"}}>Not yet registered? Sign up from <button style={{color: "blue", background: "none", outline: "none", border: "none" }} onClick={() => setShowMenu('reg-open')}>here</button></p>
        </div>
        )
    } else if (showMenu === 'reg-open') {
      return (
        <div id="login-container" style={{ background: "linear-gradient(135deg, rgba(255, 255, 255, 0.8) , rgba(255, 255, 255, 0) )"}}>
        <form id="form-container" onSubmit={handleSignUp}>
          <h3 style={{margin:"0px",padding:"2px", position: "absolute", top: "10px"}}>Sign up</h3>
          <div id="x-button" onClick={(menuHandler)}><div className="x1"></div><div className="x2"></div></div>
          <p className="p-tab" style={{fontSize: "12px", marginRight: "auto"}}>Username</p>
          <input className="login-inputs" type="text" value={username} name="Username" onChange={({target}) => setUsername(target.value)} />
          <p className="p-tab" style={{fontSize: "12px", marginRight: "auto"}}>Password</p>
          <input className="login-inputs" type="password" value={password} name="Password" onChange={({target}) => setPassword(target.value)} />
          <button type="submit">Sign up</button>
        </form>
        <p className="p-tab" style={{fontSize: "12px"}}>Already registered? Sign in from <button style={{color: "blue", background: "none", outline: "none", border: "none" }} onClick={() => setShowMenu('open')}>here</button></p>
      </div>
      )
    } else if (showMenu === 'auth-open')
      return (
          <>
          <div id="menu-container">
            <div id="x-button" onClick={(menuHandler)}><div className="x1"></div><div className="x2"></div></div>
            <div style={{width: "100%", borderBottom: "1px solid rgba(255,255,255,0.4", textAlign: "center", paddingBottom: "2px", marginBottom: "10px"}}>Welcome {user.username}!</div>
            <div style={{width: "100%", textAlign: "center", paddingBottom: "2px", marginBottom: "3px"}}>Your favorites:</div>
            <FavoriteCities cities={favorites} setCityFilter={setCityFilter}/>
            <button style={{marginTop: "20px"}} onClick={() => logOut()}>logout</button>
          </div>
          </>
      )
  }

  export {Filter, Suggestion, Cities, Menu}