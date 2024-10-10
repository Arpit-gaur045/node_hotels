const jwt=require('jsonwebtoken');

const jwtAuthMiddleware=(req,res,next)=>{
  
    //first check request headers has authorization or not

    const authorization=req.headers.authorization;
    if(!authorization) return res.status(401).json({err:'Token not found'});
 





    //extract the jwt token from the request headers

    //token is something like "Bearer xnudsbcuniPooraToken" toh neeche diya hua split function ye kar raha
    //haiki space ke baad waala jo cheez hai joki token ko represent kar rahi hai usse
    //array ke index 1 pe store kar deraha hai 
    const token=req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({err:'Unauthorized'});

    try{

        //validate the token
        //jwt.verify is a function that will verify the token and return the decoded payload if valid
        //if token is invalid, it will throw an error
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        //attach user information to the request object
        req.user=decoded;
        next();

    }catch(err){
        console.log(err);
        res.status(401).json({err:'Invalid token'});

    }

}


//function to generate JWT token

const generateToken=(userData)=>{

    //generate a new JWT token using user data
    //process.env.JWT_SECRET is a secret key used for signing the token
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:3000});

}

module.exports={jwtAuthMiddleware,generateToken};