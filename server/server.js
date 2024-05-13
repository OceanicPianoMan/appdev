require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userroutes')
const albumRoutes = require('./routes/albumroutes')

//express app 
const app = express()

//middleware
app.use(express.json())

//dev output
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//routes
app.use('/api/userroutes', userRoutes)
app.use('/api/albumroutes', albumRoutes)

//connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    //listener for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to DB and listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
