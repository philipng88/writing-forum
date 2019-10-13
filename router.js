const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')
const postController = require('./controllers/postController')

// user routes
router.get('/', userController.home)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

// profile routes
router.get('/profile/:username', userController.ifUserExists, userController.profilePostsScreen)

// post routes
router.get('/create-post', userController.isLoggedIn, postController.viewCreateScreen)
router.post('/create-post', userController.isLoggedIn, postController.create)
router.get('/post/:id', postController.viewSingle)

module.exports = router 