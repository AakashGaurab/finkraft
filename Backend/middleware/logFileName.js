let {files} = require("../models");
const db = require("../models");

const log = async(req,res,next)=>{
    let filename = req.file.originalname;
    let id = req.body.id;
    try {
        await files.create({userid:`${id}`, filename:`${filename}`, uploadDate:`${Date().toString()}` });
        next()
    } catch (error) {
        res.json(error);
    }
}


const deleteLogger = async (req,res,next)=>{
    let filename = req.params.filename;
    try {
        let [results,metadata] = await db.sequelize.query(`delete from files where filename = "${filename}"`);
        next()
    } catch (error) {
        res.json(error);
    }
}


module.exports={log,deleteLogger}