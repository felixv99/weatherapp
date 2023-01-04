const axios = require('axios')
const citiesRouter = require('express').Router()
const City = require('../models/city')

citiesRouter.get('/cities', async (request, response) => {
    const cities = await City
    .find({}).populate()
    response.json(cities)
    })


citiesRouter.get('/weather', async (request, response) => {
    const lat = request.query.lat
    const lon = request.query.lon
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`)
    response.json(res.data)
    })

module.exports = citiesRouter