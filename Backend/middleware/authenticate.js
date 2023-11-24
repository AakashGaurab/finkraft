const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const auth = (req,res,next)=>{
    let token = req.cookies.normal_token;
    if (token){
        jwt.verify(token,"blog",(err,decoded)=>{
            if (decoded){
                req.body.id = decoded.id;
                next();
            }
            else {
                res.json("Please Login");
            }
        })
    }
    else {
        res.json("No Token Found");
    }
    
}

module.exports={auth};