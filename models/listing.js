const mongoose=require("mongoose");
const reviews = require("./review");
const { Schema } = mongoose;
const Review =require("./review.js")
const listingSchema=new Schema({
    title: {
        type:String,
        required:true,
    },
    description: {
        type:String, 
    },
    image:{
        url:String,
        filename:String,
    },
    price:Number,
    location:String,
    country:String,
    //WE ARE CREATINGS REVIEWS ARRAY
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
         ref:"User",
    },
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
});


const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;
