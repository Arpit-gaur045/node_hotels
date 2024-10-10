const express = require("express");
const app = express();

const db=require('./db');

require('dotenv').config();
const passport = require('./auth');






//install npm i  body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //body parser data ko convert karke req.body mein save karlega

const PORT=process.env.PORT||3000;

//Middleware function

const logRequest = (req, res, next) =>{
    console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
    next();//move on to the next phase which can even be a next middleware
}


//neeche diye hue mein sabse pehli cheez hamara end point hai,
//uske baad dusri cheez middleware aur teesra hamara function 
// app.get("/",logRequest, function (req, res) {
//     res.send('Welcome to my Hotel...How i can help you?, we have list of menus');
//   });
//ye upar waale se bs isi eak mein ye implement hoga rather we want that
//ki har eak mein ho,In that case

 app.use(logRequest);





app.use(passport.initialize());

const localAuthMiddleware=passport.authenticate('local',{session:false})
app.get('/',localAuthMiddleware, function (req, res) {
        res.send('Welcome to my Hotel...How i can help you?, we have list of menus');
       });
// const Person = require('./models/Person')
// const MenuItem=require('./models/MenuItem')


// //POST route to add a person
// app.post('/person',async (req,res) => {
//   try{
//         const data=req.body;//assuming the request body contains the person data 

//         //create a new person document using the mongoose model
//         const newPerson=new Person(data);
//         //save the new person to the database using mongoose's save method
//         const response= await newPerson.save();
//         console.log('data saved');
//         res.status(200).json(response);
//   }catch(err){
//         console.log(err);
//         res.status(500).json({error:'Internal Server Error'});
//   }

// })

// app.post('/menu',async(req,res)=>{
//     try{
        
//          const data=req.body;
//          const menuItem=new MenuItem(data);
//          const response=await menuItem.save();
//          console.log('data saved');
//          res.status(200).json(response);


//     }catch(err){
//         console.log(err);
//         res.status(500).json({error:'Internal Server Error'});``
//     }
// })

// app.get('/person',async (req,res)=>{
//     try{
//          const data=await Person.find();
//          console.log('data fetched');
//         res.status(200).json(data);
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error:'Internal Server Error'});
//     }
// })

// app.get('/menu',async (req,res)=>{
  
//     try{

//         const data=await MenuItem.find();
//         console.log('data fetched');
//         res.status(200).json(data);

//     }catch(err){
      
//         console.log(err);
//         res.status(500).json({error:'Internal Server Error'});

//     }


// })



//by writing "  : " colon before writing workType, now it has become a variable
// app.get('/person/:workType',async (req,res)=>{
      


// })


//neeche likhe gaye vakya mein humne aant mein callback ka upyog kiya tha
//par hum industry mein aisa paap nahi karte
//async await rocks, toh upar waala padh aur maze kar
/*
app.post('/person',(req,res)=>{
    
    const data=req.body    //assuming the request body contains the person data 

    create a new person document using the Mongoose model
    

    method 1
    const newPerson=new Person();
    newPerson.name=data.name;
    newPerson.age=data.age;
    newPerson.mobile=data.mobile;
    newPerson.address=data.address;
    

    method 2
    const newPerson=new Person(data);

    save the new person to the database
    


    /* the below code that returns a callback is no longer used because it affects code readability
       and really deprecated way
       toh kya use karu?


       asynccccc and  awaittttttttttttttt


    newPerson.save((error,savedPerson)=>{
        if(error){
            console.log('Error saving person',error);
            res.status(500).json({error:'internal server error'})
        }else{
            console.log('data saved successfully');
            res.status(200).json(savedPerson);
        }
    })
    


})*/

//import the router files
const personRoutes=require('./routes/personRoutes');
const menuRoutes=require('./routes/menuRoutes');

//use the routers
app.use('/person',personRoutes);





//use the routers
app.use('/menu',menuRoutes);


app.listen(3000,()=>{
    console.log('listening on port 3000');
});