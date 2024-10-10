const mongoose = require("mongoose");
const bcrypt=require("bcrypt");


//Define person schema

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "manager", "waiter"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
  username:{
    required: true,
    type:String
  },
  password:{
    required: true,
    type: String
  }
});



//ab upar banaye hue schema se hum model banayenge
//Create person model

personSchema.pre('save',async function(next){

  //jab bhi ye save operation perform hone wala hoga kisi bhi record keliye is person 
  //schema ke andar, this yaha par yahi reprrsent kar raha haiki humlog har record keliye 
  //jab bhi save operation perform karne waale honge toh pre middleware call hoga
  const person = this;


  //hash the password only if it has been modified (or is new)

  //basically hum ye hashing wagerah waali cheez toh tabhi karenge na jab 
  //yatoh hamare paas koi naya record aaye yafir hum password ko change ya 
  //update ya modify karne waali request ho, baakiyo keliye nahi he zaroorat hai
  //jaise koi insaan apna email change karna chahta haitoh password ko
  //kyun he chedo
  if(!person.isModified('password')) return next();

   try{
       //hash password generation
       const salt = await bcrypt.genSalt(10);

       //hash password

       const hashedPassword= await bcrypt.hash(person.password,salt);

       //Override the plain password with the hashed one

       person.password=hashedPassword;

    next();
   }catch(err){

    return next(error);

   }
  //next eak callback function hai joki batata haiki ab tum cheezein db mein jaake
  //save kardo,koi dikkat waali baat nahi hai

  
})


personSchema.methods.comparePassword= async function(candidatePassword){
  try{ 

    //use bcrypt to compare the provided password with the hashed password

    const isMatch=await bcrypt.compare(candidatePassword,this.password);
    return isMatch;

  }catch(err){
       
    throw err;
  }
}

const Person = mongoose.model("Person", personSchema)
module.exports = Person;
