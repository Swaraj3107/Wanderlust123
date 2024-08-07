const express = require('express');
// const mongoose=require("mongoose");
// const { Schema } = mongoose;
// const passportLocalMongoose=require("passport-local-mongoose");
// //passport local mongoose will automatically define password and username
// const userSchema=new Schema({
//     email:{
//         type:String,
//         required:true,
//     }
// })

// userSchema.plugin(passportLocalMongoose);
// module.exports=mongoose.model("User",userSchema);

const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

// passport local mongoose will automatically define password and username
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);

