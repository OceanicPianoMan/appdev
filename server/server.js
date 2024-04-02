require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const testRoutes = require('./routes/testroutes')

//express app 
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//routes
app.use('/api/testroutes', testRoutes)

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
