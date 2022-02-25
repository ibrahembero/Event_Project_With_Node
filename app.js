// "test": "echo \"Error: no test specified\" && exit 1"
//console.log('hello world it is working now');
// we call the file express to make routes
const express = require("express")
const app = express()
// connect to database
const db = require('./config/database')
//call body-parser to fetch data from form
const bodyParser = require('body-parser')
// call express session
const session = require('express-session')
//call connect flash
const flash = require('connect-flash')
const passport = require('passport')
const passportSetup = require('./config/passport-setup')


// bring ejs template
app.set('view engine','ejs')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// bring static
app.use(express.static('public'))
app.use(express.static('uploads')) 
app.use(express.static('node_modules'))
// session and flash config
app.use(session({
    secret: 'lorem ipson',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 * 15 }
  }))
app.use(flash())

//bring passport
app.use(passport.initialize())
app.use(passport.session())
// store user object
// * it means any request
app.get('*',(req,res,next)=>{
    res.locals.user = req.user || null
    next()
})
// make route with es6
app.get('/',(req,res)=>{
    //res.send('hello it is working from web')
    res.redirect('/events')
})
// brings events routes
const events = require('./routes/event-routes')
app.use('/events',events)

// brings user routes
const users = require('./routes/user-routes')
app.use('/users',users)

// listen to port 3000
app.listen(3000,()=>{
    console.log('it is listening to port 3000')
})