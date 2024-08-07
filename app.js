// Requiring Express
if(process.env.NODE_ENV!="production"){  
require('dotenv').config();
}

const express = require("express");
const app = express();
const port = 8080;

// Requiring path for using public and views folder
const path = require("path");

// Requiring mongoose and method-override
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const engine = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const listingRouter=require("./routes/listing.js");//We are requiring listing.js from route
const reviewRouter=require("./routes/review.js");//We are requiring review.js from route
const userRouter=require("./routes/user.js");
const session=require("express-session");//Requiring session
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");//requiring flash
const { listingSchema } = require("./schema.js");
mongoose.set('strictPopulate', false);




//REQUIRING PASSPORT
const passport=require("passport");
const LocalStrategy=require("passport-local")
const User=require("./models/user.js");
// const{reviewSchema}=require(" ./schema.js")
mongoose.set('strictQuery', true);
// Method override middleware
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

const dbUrl=process.env.ATLASDB_URL;
// Database connection
main()
    .then(() => {
        console.log("connection successful");
    })
    .catch((err) => console.log(err));

// async function main() {
//     await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
// }


async function main() {
    await mongoose.connect(dbUrl);
}




// Using ejs
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.set("views", path.join(__dirname, "/views"));

const store= MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret: process.env.SECRET,
    },
    touchAfter:24*3680,
});

store.on("error",()=>{
    console.log("ERROR in MONGO SESSION STORE",err);
})

//Setting the session
const sessionOption={
    store,
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie :{
        expires:Date.now()+ 7 *24*60*60*1000,//We will give in milli second
        maxAge:7 *24*60*60*1000,
        httpOnly: true,
    },
};

///


app.use(session(sessionOption));
app.use(flash());//We should use flash before Routes

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Basic route
// app.get("/", (req, res) => {
//     res.send("getting");
// });




app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})


// Handling the error



app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { err });
});

// app.get("/demouser",async(req,res)=>{
//     let fakeUser =new User({
//         email:"Student@gmail.com",
        
//     })
// })



app.use("/listings",listingRouter);//Where listings will come we will use listing
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});

// Creating the server
app.listen(port, () => {
    console.log(`app is listening to port ${port}`);
});
