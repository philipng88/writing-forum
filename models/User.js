const usersCollection = require("../db").collection("users")
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

    if (this.data.password.length > 100) {
        this.errors.push("ERROR: Password cannot exceed 100 characters")
    }

    if (this.data.username.length > 0 && this.data.username.length < 3) {
        this.errors.push("ERROR: Username must be at least 3 characters")
    }

    if (this.data.username.length > 30) {
        this.errors.push("ERROR: Username cannot exceed 30 characters")
    }
}

User.prototype.register = function() {
    this.cleanUp()
    this.validate()
    if (!this.errors.length) {
        usersCollection.insertOne(this.data)
    }
}

module.exports = User