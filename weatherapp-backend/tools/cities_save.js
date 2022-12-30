const mongoose = require('mongoose')
const cities_data = require('./cities.json')

const url =
  `mongodb+srv://fullstack:qszGtr69@cluster0.96cthps.mongodb.net/weatherApp?retryWrites=true&w=majority`

mongoose.connect(url)
const User = mongoose.model('User', userSchema)

const citySchema = new mongoose.Schema({
    name: String,
    lat: String,
    lng: Number,
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country'
    }
  })

const City = mongoose.model('City', citySchema)
cities_data.map(cityobj => {
    const city = new City({
        name: cityobj.name,
        lat: cityobj.lat,
        lng: cityobj.lng,
        country: cityobj.country
    })

    city.save().then(result => {
        console.log('blog saved!')
      })
})
//mongoose.connection.close()
