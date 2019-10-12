const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const path = require('path')
const favicon = require('serve-favicon')
const app = express()

let sessionOptions = session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: new MongoStore({ client: require('./db') }),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 86400000, httpOnly: true }
})

app.use(sessionOptions)
app.use(flash())

app.use((req, res, next) => {
    res.locals.user = req.session.user
    next()
})

const router = require('./router')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(express.static('public'))
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')))
app.set('views', 'views')
app.set('view engine', 'ejs')

app.use('/', router)

module.exports = app