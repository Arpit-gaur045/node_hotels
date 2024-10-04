//this file is responsible for databse connection baithaane keliye

//npm i mongoose chla dena pehle
const mongoose =require ('mongoose');

//Define the MongoDB connection URL

const mongoURL='mongodb://127.0.0.1:27017/hotels'
//you can write anything else also /hotels ki jagah, yaha hum restaurant se related kuch 
//banane waale hai thus have written /hotels



//set up MongoDB connection
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})


//Get the default connection
//Mongoose maintains a default connection object representing the MongoDB connection
const db=mongoose.connection;

//Define event listeners for database connection

db.on('connected',()=>{
    console.log('connected to MongoDB server');
})

db.on('error',(err)=>{
    console.log('MongoDB connection error:',err);
})


db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
})


//Export the database connection
module.exports=db;


