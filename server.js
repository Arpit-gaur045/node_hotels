console.log("server chl giyooooo");


//if we wanna write a function jo likhte ke saath he run hojaye

(function(){
    console.log('arpit')
})();

//callback
//main waale function ke andar ka saara kaam hone ke baad,callback aajata hai
//main ke andar as a parameter paas hua uske baad saara kaam complete hone ke baad call hogaya
//when a function is called inside another function is referred to as a callback function,
//jo call horaha dusre ke andar usse bolenge callback function


//1st way
const add= function(a,b,callback){
    
     console.log(a+b);
     console.log("main ka hogaya");
     callback();

}

function callback(){
    console.log("ye main ke baad aaya")
}

add(5,4,callback);

//2nd way ---thoda chota kiya,alag se define ki jagah humne call karte time callback paas kardiya

const adder= function(a,b,arpit){
    
    console.log(a+b);
    console.log("main ka hogaya phirse");
    arpit();

}



adder(5,4,function(){
    console.log("ye main ke baad phirse aaya")
 });

 //3rd way --- ab upar waale ko arrow function banado kyunki eak line wala he hai
 
 const adderrrrr= function(a,b,arpitt){
    
    console.log(a+b);
    console.log("main ka hogaya phirse2");
    arpitt();

}



adderrrrr(5,4,()=>console.log("ye main ke baad phirse aaya2"));




 