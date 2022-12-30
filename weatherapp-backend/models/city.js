const mongoose = require('mongoose')

const citySchema = mongoose.Schema({
    country: String,
    name: {
        type: String,
        required: true
        },
    lat: String,
    lng: String,
  })

citySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    /*delete returnedObject._id*/
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('City', citySchema)