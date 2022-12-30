const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/login', async (request, response) => {
    const {username, password} = request.body

    const user = await User.findOne({username})
    const passwordCheck = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCheck)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response
    .status(200)
    .send({token, username: user.username, name: user.name})
})

loginRouter.post('/register', async (request, response, next) => {
    const { username, name, password } = request.body
    try {
        if ( password == null || password.length < 3 ) {
            response.status(400).send({error: 'Password is shorter the minimum allowed length (3)'}).end()
        
        }
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)
        const user = new User({
            username,
            name,
            passwordHash,
        })
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch(exception) {
        next(exception)
    }
})
  

module.exports = loginRouter