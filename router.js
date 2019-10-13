const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')
const postController = require('./controllers/postController')

// user routes
router.get('/', userController.home)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

// post routes
router.get('/create-post', userController.isLoggedIn, postController.viewCreateScreen)
router.post('/create-post', userController.isLoggedIn, postController.create)

module.exports = router 