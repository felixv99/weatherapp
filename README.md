
# Weather App (W.I.P)

App that shows information about current weather for any city. When signed in, the app allows saving favorite cities, and easy access to them via menu
*This app is still work-in-progress and I'm planning to finish it during the next couple of weeks*


![alt text](https://github.com/felixv99/weatherapp/blob/master/preview.png "Weather app preview")

Current known bugs / to do list can be found in ./weatherapp-frontend/src/bugs.txt
## Installation

Use "npm install" to install node_modules, and run both frontend and backend on separate instances with "npm start"
In order to be able to run the application properly, mongodb connection string and OpenWeatherMap API key is needed.

### *Cities data to mongodb*
The combination of cities and countries data can be done from ./weatherapp-backend/tools/citycountrytool.js
or just by using the cities.json file from the same folder

Easiest way to upload  json data to mongodb is through [MongoDB Command Line Database Tools](https://www.mongodb.com/try/download/database-tools) with mongoimport



## Technologies used
 

### *Front-end:*
React

### *Back-end:*
Node.js

Mongodb

## Data and images

Weather icons by [Zvonimir Juranko](https://www.figma.com/@zvosh)

Cities of the world [https://github.com/lutangar/cities.json](https://github.com/lutangar/cities.json)

Countries data [https://github.com/annexare/Countries](https://github.com/annexare/Countries)

Cities of the world and countries data used in combination in mongodb

Real-time weather information is coming for Open Weather Map API

## License

[GNU GPL 3.0](https://www.gnu.org/licenses/gpl-3.0.html)
