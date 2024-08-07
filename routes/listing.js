const express = require("express");
const mongoose = require('mongoose');
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const passport=require("passport");
const { listingSchema } = require("../schema.js");
const{isLoggedIn}=require('../middleware.js');//Getting the middleware
const{storage}=require("../cloudConfig.js");
const multer  = require('multer');
const upload = multer({ storage });
const listingController=require("../controllers/listings.js");
const { isOwner } = require('../middleware.js'); 




const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400, "Send valid data for listing");//change this
    }
    else{
        next();
    }
}

router
   .route("/")
   .get( wrapAsync(listingController.index))
    .post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.postListing));
   



// New listings
router.get("/new",isLoggedIn,listingController.renderNewForm);

router
    .route("/:id")
    .get( wrapAsync(listingController.showListing))
    .put( isLoggedIn,isOwner,upload.single('listing[image]'),validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing)
);
   


// Edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

module.exports=router;





// //INDEX ROUTE
// router.get("/", wrapAsync(listingController.index));

// // New listings
// router.get("/new",isLoggedIn,listingController.renderNewForm);

// router.post("/",isLoggedIn,validateListing,wrapAsync(listingController.postListing));

// // Find particular by id
// router.get("/:id", wrapAsync(listingController.showListing));

// // Edit route
// router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

// // Update route with logging
// router.put("/:id", isLoggedIn,isOwner,validateListing, wrapAsync(listingController.updateListing));

// // Delete route
// router.delete("/:id",isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));

// module.exports=router;
