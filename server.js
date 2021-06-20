require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT || 2485
const path = require('path')
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

app.set('views', path.join(__dirname + '/views'))
app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))

// Routes [Start]

const indexRoute = require('./routes/indexRoute')
app.use('/', indexRoute)

const signUpRoute = require('./routes/signUpRoute')
app.use('/signUp', signUpRoute)

const usersRoute = require('./routes/userRoute')
app.use('/users', usersRoute)

// Routes [End]

app.listen(PORT, () => console.log(`Running server on port ${PORT}`))
