const express = require('express');
const router = express.Router();

const Person=require('./../models/Person');
const {jwtAuthMiddleware,generateToken} = require('./../jwt');
//Post route to add a person

//jab bhi koi /person pe hit karega toh uske baaju waala function run hoga
router.post('/signup', async (req,res)=>{

    try{
         
    const data=req.body;
    const newPerson=new Person(data);
    const response=await newPerson.save();
    console.log('data saved');

    const payload={
        id: response.id,
        username: response.username
    }
    console.log(JSON.stringify(payload));
    const token=generateToken(payload);

    console.log("token is : ",token);

    res.status(200).json({response:response,token:token});

    }catch(err){
            console.log(err);
            res.status(500).json({error:'Internal Server Error'});
    }

})


//Login Route

router.post('/login',async (req,res)=>{
    try{

        //extract username and password from request body

        const {username,password}=req.body;
        //find the user in the database using the username

        const user=await Person.findOne({username:username});
        //if user does not exist or password does not match, return error
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:'invalid username or password'});
        }

        //generate Token 
        const payload={
            id :user.id,
            username: user.username
        }

        const token=generateToken(payload);

        //return the token as response

        res.json({token})

    }catch(err){

        console.log(err);
        res.status(500).json({error:'Internal Server Error'});


    }

})

//Profile Route

router.get('/profile',jwtAuthMiddleware,async (req, res) => {
  
    try{


        const userData=req.user;
        console.log("user Data: " + userData);

        const userId=userData.id;
        const user=await Person.findById(userId);

        res.status(200).json({user});

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }



})
router.get('/',jwtAuthMiddleware,async (req,res)=>{
     try{
        const data=await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
     }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
     }
   
})


router.get('/:workType',async (req,res)=>{

    try{
      
     //extract the work type from the URL parameter
     const workType=req.params.workType;
     //params isiliye likha hai kyunki ye eak type ka parameter hai
     if(workType=='chef'||workType=='waiter'||workType=='manager'){
           
         const response=await Person.find({work: workType});
         console.log('response fetched');
         res.status(200).json(response);
 
        
 
 
     }else{
         res.status(404).json({error:'invalid work type'})
     }
    }catch(err){
                
     console.log(err);
         res.status(500).json({error:'Internal Server Error'});
               
     
    }
 
 
 })


 router.put('/:id', async(req,res)=>{
    try{
          //neeche waali line mein aisa kuch horaha haiki,sabse pehla kaam jab bhi hame
          //kisi bhi data ko update karna hai toh hume eak unique identifier chahiye
          //joki har eak data keliye alag ho, aur hum poore database mein eak particular
          //data ko uske indentifier ke through pehchaan ke usse update kar sake
          //In this case,hamare har eak data ke saath eak unique id attached hai toh
          //hum apne url mein jis bhi data ko update karna hai uski id pass kardenge
          //upar vo put mein '/:id' isiliye likha hai kyunki ye ':'ye colon actually ye batata
          //haiki id eak variable hai and yaha humne id likha hai par iska kuch bhi naam
          //likh sakte hai jaise arpitId,lassanId ya kuch bhi
          //ab ye just neeche waali line ye kar rahi haiki url se ID ko nikal ke personId mein save
          //phir next line mein aisa haiki,
          //hum actually postman mein jobhi naya data hoga usse body mein bhej denge
          //jaise agar aapko name change karna haitoh,
          //{
          //  "name": "newname"
          //}
          //and aise he baaki parameter ko bhi change karne keliye send kar sakte
          //phir kuch nahu updated person mein ye naya wala store kara hai
          //ye updated person ko uske id ke through pehchaan ke usse findByIdAndUpdate method mein hame find kiya hai
          //and aur uske new:true mein aisa haiki, jo updated person ko return karega
          //runValidators:true mein aisa haiki, jo updated person ko validation rules run karega
        const personId=req.params.id;//Extract the id from the URL parameter
        const updatedPersonData=req.body;

        const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,//return the updated document
            runValidators:true//run the validation rules i.e. run mongoose validation 
        })
        //basically teen cases bante hai,
        //pehla ye haiki success hogaya,update hogaya toh aapko success mein naya person
        //ka data response mein mil jayega
        //dusra ye haiki agar fail hogaya,
        //toh vo catch block mein jayega aur usmein aapko sara error miljayega and thus uske
        //uske according he response
        //aur teesra ye haiki,
        //hamara jo Person.findByIdAndUpdate wala ye function haina ye sabse pehle
        //toh personId se us data ko dhundta hai, ab ye bhi possible haina ki
        //id humne galat dedi and is id ka koi data mila he nahi
        //toh aise case mein vo kuch bhi return nahi karpayega,
        //and aise case mein jab response kuch bhi nahi aata toh ye neeche wala code execute hojayega
        //If no person is found with the given id, return a 404 error message
        if(!response){
            return res.status(404).json({error:'Person not found'})
        }

        console.log('data updated');
        res.status(200).json(response);
        

    }catch(err){
         
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }

 })


 router.delete('/:id', async(req,res)=>{
        
    try{
        //neeche waali line mein aisa kuch horaha haiki,
        //sabse pehla kaam jab bhi hame
        //kisi bhi data ko delete karna hai toh hume eak unique identifier chahiye
        //joki har eak data keliye alag ho, aur hum poore database mein eak particular
        //data ko uske indentifier ke through pehchaan ke usse remove method mein hame 
        //findByIdAndRemove method mein hame find kiya hai
        //and aur uske id ke through pehchaan ke usse findByIdAndRemove method mein hame find kiya hai
        
        const personId=req.params.id;//extract the person id from the URL parameter
        //Assuming you have a person model
        const response=await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error:'Person not found'})
        }

        console.log('data deleted');
        res.status(200).json({message:'person deleted successfully'});


}catch(err){

    console.log(err);
    res.status(500).json({error:'Internal Server Error'});

    }

 })

 module.exports=router;