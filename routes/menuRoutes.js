const express = require('express');
const router = express.Router();

const MenuItem=require('./../models/MenuItem');

router.post('/',async (req,res)=>{

    try{

          const data=req.data;
          const newMenu= new MenuItem(data);
          const response= await newMenu.save();
          console.log('data saved');
          res.status(200).json(response);

          




    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }

})


router.get('/',async (req,res)=>{
    try{
         
        const data= await MenuItem.find();
        console.log("data fetched");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});

    }
})

router.get('/:tastetype',async (req,res)=>{
    try{

        const tastetype=req.params.tastetype;
        if(tastetype=='sweet'||tastetype=='spicy'||tastetype=='sour'){

            const response= await MenuItem.find({taste:tastetype});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error:'Invalid taste type'});
        }
          


    }catch(err){
                
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})
//comment added for testing purposes
module.exports=router;