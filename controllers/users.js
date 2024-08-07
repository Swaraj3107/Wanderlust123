
const Listing=require("../models/user");
const User = require("../models/user");
module.exports.renderSignupForm=(req, res) => {
    res.render("users/signup");
};



module.exports.signup=async (req, res, next) => { // Added 'next' parameter here
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        throw new ExpressError("All fields are required", 400);
    }
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", "Welcome to Wanderlust!");
        res.redirect("/listings");
    });
}


module.exports.renderLoginForm=(req, res) => {
    res.render("users/login");
}


module.exports.login=async (req, res) => {
    req.flash("success", "Welcome to Wanderlust! You are logged in!");
    const redirectUrl = req.session.redirectUrl || '/listings';
    delete req.session.redirectUrl;
    res.redirect(redirectUrl);
}


module.exports.logout=(req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash("success", "You are logged out");
        res.redirect("/listings");
    });
}