const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const app = express()

const router = require('./router')

app.use(express.static('public'))
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')))
app.set('views', 'views')
app.set('view engine', 'ejs')

app.use('/', router)

app.listen(3000)