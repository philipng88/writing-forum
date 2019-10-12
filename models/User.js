const bcrypt = require("bcryptjs")
const usersCollection = require("../db").db().collection("users")
const validator = require("validator")

const User = function(data) {
    this.data = data 
    this.errors = []   
}

User.prototype.cleanUp = function() {
    if (typeof(this.data.username) != "string") {
        this.data.username = ""
    }

    if (typeof(this.data.email) != "string") {
        this.data.email = ""
    }

    if (typeof(this.data.password) != "string") {
        this.data.password = ""
    }

    this.data = {
        username: this.data.username.trim().toLowerCase(),
        email: this.data.email.trim().toLowerCase(),
        password: this.data.password
    }
}

User.prototype.validate = function() {
    return new Promise(async (resolve, reject) => {
        if (this.data.username == "") {
            this.errors.push("ERROR: You must provide a username")
        }
    
        if (this.data.username != "" && !validator.isAlphanumeric(this.data.username)) {
            this.errors.push("ERROR: Username can only contain letters and numbers")
        }
    
        if (!validator.isEmail(this.data.email)) {
            this.errors.push("ERROR: You must provide a valid email address")
        }
    
        if (this.data.password == "") {
            this.errors.push("ERROR: You must set a password")
        }
    
        if (this.data.password.length > 0 && this.data.password.length < 12) {
            this.errors.push("ERROR: Password must be at least 12 characters")
        }
    
        if (this.data.password.length > 50) {
            this.errors.push("ERROR: Password cannot exceed 50 characters")
        }
    
        if (this.data.username.length > 0 && this.data.username.length < 3) {
            this.errors.push("ERROR: Username must be at least 3 characters")
        }
    
        if (this.data.username.length > 30) {
            this.errors.push("ERROR: Username cannot exceed 30 characters")
        }
    
        if (this.data.username.length > 2 && this.data.username.length < 31 && validator.isAlphanumeric(this.data.username)) {
            let usernameExists = await usersCollection.findOne({username: this.data.username})
            if (usernameExists) {
                this.errors.push("ERROR: A user with that username already exits")
            }
        }
    
        if (validator.isEmail(this.data.email)) {
            let emailExists = await usersCollection.findOne({email: this.data.email})
            if (emailExists) {
                this.errors.push("ERROR: A user with that email address already exits")
            }
        }
        resolve() 
    })
}

User.prototype.login = function() {
    return new Promise((resolve, reject) => {
        this.cleanUp()
        usersCollection.findOne({username: this.data.username}).then(foundUser => {
            if (foundUser && bcrypt.compareSync(this.data.password, foundUser.password)) {
                resolve("Login successful")
            } else {
                reject("ERROR: Invalid username and/or password")
            }
        }).catch(() => {
            reject("Please try again later")
        })
    })
}

User.prototype.register = function() {
    return new Promise(async (resolve, reject) => {
        this.cleanUp()
        await this.validate()
        if (!this.errors.length) {
            let salt = bcrypt.genSaltSync()
            this.data.password = bcrypt.hashSync(this.data.password, salt)
            await usersCollection.insertOne(this.data)
            resolve()
        } else {
            reject(this.errors)
        }
    })
}

module.exports = User