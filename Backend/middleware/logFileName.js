let {files} = require("../models");


const log = async(req,res,next)=>{
    let filename = req.file.originalname;
    let id = req.body.id;
    console.log(id,filename)
    try {
        await files.create({userid:`${id}`, filename:`${filename}`, uploadDate:`${Date().toString()}` });
        next()
    } catch (error) {
        res.json(error);
    }
}



module.exports={log}