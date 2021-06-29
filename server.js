const result = require('dotenv').config()

if (result.error) {
  throw result.error
}

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

const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to Database'))

app.set('views', path.join(__dirname + '/views'))
app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))
app.use(express.json())

// Routes [Start]

const indexRoute = require('./routes/indexRoute')
app.use('/', indexRoute)

const signUpRoute = require('./routes/signUpRoute')
app.use('/signUp', signUpRoute)

const loginRoute = require('./routes/loginRoute')
app.use('/login', loginRoute)


const memberRouter = require('./routes/memberRouter')
app.use('/member', memberRouter)

const blogRoute = require('./routes/blogRouter')
app.use('/blog', blogRoute)

const blogCreationRouter = require('./routes/blogCreationRouter')
app.use('/blogCreation', blogCreationRouter)

const accountRouter = require('./routes/account')
app.use('/account', accountRouter)

// Routes [End]

app.listen(PORT, () => console.log(`Running server on port ${PORT}`))
