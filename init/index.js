const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");
mongoose.set('strictQuery', true);
main()
    .then(()=>{
            console.log("connection successfull");
           })
           .catch((err)=>console.log(err));
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust'); //IT IS USED TO CONNECT WITH DATABASE //test is the name of the database //Async function is the function which does not work with flow 
}

const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data= initData.data.map((obj)=>({
        ...obj,
        owner:"66a10bf9effb86ff672e1938",
    }));
    await Listing.insertMany(initData.data);
    console.log("data was intialised");
};
initDB();
