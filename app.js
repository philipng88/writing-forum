const express = require('express')
const session = require('express-session')
const path = require('path')
const favicon = require('serve-favicon')
const app = express()

let sessionOptions = session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 86400000, httpOnly: true }
})

app.use(sessionOptions)

const router = require('./router')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(express.static('public'))
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')))
app.set('views', 'views')
app.set('view engine', 'ejs')

app.use('/', router)

module.exports = app