//import cities_data from 'cities.json';
//import {countries} from 'countries-list'
const cities_data = require('cities.json')
const countriesl = require('countries-list')
const fs = require('fs')

cities_data.sort((a,b)=> (a.name > b.name ? 1 : -1))


const new_data = cities_data.map(city =>  ({
    ...city,
    country: countriesl.countries[city.country].name,
  })
  )

  fs.writeFile('./tools/cities.json', JSON.stringify(new_data), err => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });