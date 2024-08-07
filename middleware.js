// // middleware.js
// module.exports.isLoggedIn = (req, res, next) => {

const Listing = require("./models/listing");
const Review= require("./models/review");

//     if (!req.isAuthenticated()) {
//         //redirect url save
//         req.session.redirectUrl=req.orignalUrl;
//         req.flash('error', 'You must be logged in');
//          return res.redirect('/login');
//     }
//     next();
   
// };

// module.exports.saveRedirectUrl=(req,res,next)=>{
//     if(req.session.redirectUrl){
//         res.locals.redirectUrl=req.session.redirectUrl;
//     }
//     next();
// };


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl; // Corrected the typo here
        req.flash('error', 'You must be logged in');
        return res.redirect('/login');
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};


module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    if (!listing.owner.equals(req.user._id)) {
        req.flash("error", "You are not the owner of the listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
};


module.exports.isReviewAuthor= async (req, res, next) => {
    let {id,reviewId } = req.params;
    let listing = await Review.findById(reviewId);
    if (!review) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
};






