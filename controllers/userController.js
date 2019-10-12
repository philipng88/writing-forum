const User = require('../models/User')

exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        req.flash("errors", "You must be logged in to perform that action")
        req.session.save(() => {
            res.redirect('/')
        })
    }
}

exports.login = (req, res) => {
    let user = new User(req.body)
    user.login().then(() => {
        req.session.user = {username: user.data.username} 
        req.session.save(() => {
            res.redirect('/')
        })
    }).catch(error => {
        req.flash("errors", error)
        req.session.save(() => {
            res.redirect('/')
        })
    })
}

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}

exports.register = (req, res) => {
    let user = new User(req.body)
    user.register().then(() => {
        req.session.user = {username: user.data.username}
        req.session.save(() => {
            res.redirect('/')
        })
    }).catch(regErrors => {
        regErrors.forEach(error => {
            req.flash("regErrors", error)
        })
        req.session.save(() => {
            res.redirect('/')
        })
    })
    
}

exports.home = (req, res) => {
    if (req.session.user) {
        res.render("home-dashboard")
    } else {
        res.render("home-guest", { errors: req.flash('errors'), regErrors: req.flash('regErrors')} )
    }
}