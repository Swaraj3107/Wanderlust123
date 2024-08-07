const Listing=require("../models/listing");
const Review=require("../models/review");

module.exports.createReview=async (req, res) => {
    let listing = await Listing.findById(req.params.id);// we are finding the listing
    let newReview = new Review(req.body.review);// we are storing data in the database so it will be of async type
    newReview.author=req.user._id;
    listing.reviews.push(newReview);
  
    await newReview.save();
    await listing.save();
    req.flash("success","New Review Created !");
    res.redirect(`/listings/${listing._id}`);
}

module.exports.destroyReview=async(req,res)=>{
    let{id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","New Review Deleted !");
    res.redirect(`/listings/${id}`);
}