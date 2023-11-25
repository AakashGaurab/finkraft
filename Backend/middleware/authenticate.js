const jwt = require("jsonwebtoken");

const auth = (req,res,next)=>{
    let token = req.headers.token;
    if (token){
        jwt.verify(token,"blog",(err,decoded)=>{
            if (decoded){
                req.body.id = decoded.id;
                next();
            }
            else {
                res.status(404).json("Please Login");
            }
        })
    }
    else {
        res.status(401).json("No Token Found");
    }
    
}

module.exports={auth};