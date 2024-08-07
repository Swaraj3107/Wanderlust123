// const express = require("express");
// const router=express.Router();
// const User=require("../models/user.js");
// const wrapAsync = require("../utils/wrapAsync.js");
// const passport=require("passport");
// const ExpressError = require("../utils/ExpressError.js");
// const { saveRedirectUrl } = require("../middleware.js");
// router.get("/signup",(req,res)=>{
//     res.render("users/signup.ejs");
// });
// router.post("/signup", wrapAsync(async (req, res) => {
//     try {
//         const { username, email, password } = req.body; // Extract username from request body
//         if (!username || !email || !password) {
//             throw new ExpressError("All fields are required", 400);
//         }
//         const newUser = new User({ username, email }); // Pass username and email to User model
//         const registeredUser = await User.register(newUser, password);
//         console.log(registeredUser);
//         req.login(registeredUser,(err)=>{
//             if(err){
//                 return next(err);
//             }
//             req.flash("success", "Welcome to Wanderlust!");
//             res.redirect("/listings");
//         });
        
//     } catch (e) {
//         req.flash("error", e.message);
//         res.redirect("/signup");
//     }
// }));

// router.get("/login",(req,res)=>{
//     res.render("users/login.ejs");
// });

// router.post(
//     "/login",
//     saveRedirectUrl,
//     passport.authenticate("local",{
//         failureRedirect:'/login',
//         failureFlash:true
//     }),
//     async(req,res)=>{
//         req.flash("success","Welcome to wanderlust ! You are loged in!");

//         res.redirect(req.session.redirectUrl);
//     } //passport.authenticate()is used to check if the passport and username exist(it work as middleware)
//                       //if failureflash:true means authentication becomes false some flash message is exceuted
// );
// router.get('/logout',(req,res,next)=>{
//     req.logOut((err)=>{
//       if(err){
//         next(err);
//       } 
//       req.flash ("success","you are logged out");
//       res.redirect("/listings");
//     })
// })
// module.exports=router;




const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const ExpressError = require("../utils/ExpressError");
const { saveRedirectUrl } = require("../middleware");
const userController=require("../controllers/users.js");

router
    .route("/signup")
    .get(userController.renderSignupForm )
    .post( wrapAsync(userController.signup));


// router.get("/signup",userController.renderSignupForm );

// router.post("/signup", wrapAsync(userController.signup));


router
    .route("/login")
    .get(userController.renderLoginForm )
    .post(
        
        saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: '/login',
            failureFlash: true
        }),
       userController.login
    );

// router.get("/login",userController.renderLoginForm );

// router.post(
//     "/login",
//     saveRedirectUrl,
//     passport.authenticate("local", {
//         failureRedirect: '/login',
//         failureFlash: true
//     }),
//    userController.login
// );

router.get('/logout',userController.logout);

module.exports = router;
