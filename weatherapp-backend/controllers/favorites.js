const favoritesRouter = require('express').Router()
const User = require('../models/user')
const City = require('../models/city')
const jwt = require('jsonwebtoken')



favoritesRouter.post('/', async (request, response, next) => {
    const body = request.body
    try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({error: "token missing or invalid"})
    }
    
  
    const user = await User.findById(decodedToken.id)
    const favorite = await City.findById(body.id)

    
    user.cities = user.cities.concat(favorite._id)
    const savedCity = await user.save()
    await savedCity.populate('cities', {name: 1, country: 1, lat: 1, lng: 1})
    console.log(savedCity)
    response.status(201).json(savedCity)
  } catch(exception) {
    console.log(exception.message)
    next(exception)
  }
  
  })

favoritesRouter.get('/:username', async (request, response) => {
    const favorites = await User
    .findOne({username: request.params.username}).populate('cities', {name: 1, country: 1, lat: 1, lng: 1})
    response.json(favorites.cities)
})

favoritesRouter.put('/:username/:cityId', async (request, response, next) => {
  
    try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({error: "token missing or invalid"})
    }

    const updatedUser = await User.findOneAndUpdate({username: request.params.username}, {$pull: { 'cities': request.params.cityId}}, { new: true })
    await updatedUser.populate('cities', {name: 1, country: 1, lat: 1, lng: 1})
    //console.log(updatedUser)
    response.status(200).json(updatedUser)
    } catch (exception) {
      next(exception)
    }
  })

  module.exports = favoritesRouter