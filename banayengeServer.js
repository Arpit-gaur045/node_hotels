//jab bhi aap code mein change karte hotoh to see the changes on server aapko server ko
//dobara run karna hota hai,
//and issi keliye we use nodemon, jo har change ke baad server ko apne aap automatically re-run
//kardega

//neeche likhi hui 3 line seedha npm express search karke vaha se uthayi gayi hai
//and in line se pehle npm i express karke express ko install karlio

const express = require("express");//express package ko apni file mein istemaal karne vaaste
const app = express(); //ye app ab express ka eak blueprint hai jismein sara data store hogiyo

app.get("/", function (req, res) {
  res.send("aao rajaa");
});
//to run this file write node banayengeServer.js
//instead of the above one start the server using nodemon banayengeServer.js kyunki
//reason file ke top pe hai
//agar koi bhi address ke aage '/' likhega toh usko jo response milega that is mentioned inside
//our res.send('....');

app.get("/", function (req, res) {
  res.send("aao rajaaaaa");
});

app.get("/momos", function (req, res) {
  res.send("tondoori khaoge beta ya steam");
});

app.get("/paneerlababdaar", function (req, res) {
    
    var customizedplate={
        naan:"butter waale laiyo",
        namak:"swaad anusaar",
        lassi:true

    }

    res.send(customizedplate);


  });



app.listen(3000,()=>{
    console.log('listening on port 3000');
});
//3000 is the port number
