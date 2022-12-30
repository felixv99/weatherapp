const citiesRouter = require('express').Router()
const City = require('../models/city')

citiesRouter.get('/cities', async (request, response) => {
    const cities = await City
    .find({}).populate()
    response.json(cities)
    })

module.exports = citiesRouter