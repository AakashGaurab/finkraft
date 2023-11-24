const express = require("express");
const user = express.Router();
const bcrypt = require("bcrypt");
const db = require("../models");
const {users} = require("../models");
const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser");
user.use(cookieParser())


user.post("/signup",async(req,res)=>{
    let payload = req.body;
    let {name,email,password} = payload;
    try {
        const [results, metadata] = await db.sequelize.query(`select * from users where email = "${email}"`);
        if (results.length==0){
            try {
                bcrypt.hash(password,5,async(err,hash)=>{
                    if (hash){
                        await users.create({name:`${name}`, email:`${email}`, password:`${hash}` });
                        res.json("User Created") 
                    }
                    else {
                        res.json("Error hashing Password");
                    }
                })
                
            } catch (error) {
                res.json(error);
            }
        }
        else {
            res.json("User Already Exists !");
        }
    } catch (error) {
        res.json(error);
    }
    
    
})


user.post("/login",async(req,res)=>{
    let {email,password} = req.body;

    try {
        let [results,metadata] = await db.sequelize.query(`select * from users where email = "${email}"`)
        if (results.length == 0){
            res.json("User Not Found");
        }
        else {
            bcrypt.compare(password,results[0].password,(err,result)=>{
                if (result){
                    let token = jwt.sign({email:results[0].id},"blog");
                    
                    res.cookie("normal_token",token,{httpOnly:true});
                    res.json({msg:"Login Succesfull",id:results[0].id});
                }
                else {
                    res.json("Wrong Password");
                }
            })
        }
    } catch (error) {
        res.json(error);
    }
})



module.exports={user};
