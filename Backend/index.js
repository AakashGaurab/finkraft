const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models")
const cookieParser = require("cookie-parser");

app.use(express.json());      
app.use(cors({origin:"*"}));   //handling cors
app.use(cookieParser());

const {user}= require("./routes/user_routes");
const {fileUpload} = require("./routes/file_upload");

app.get("/",(req,res)=>{
    res.send("Welcome to backend side of the Application");
})


app.use("/user",user);
app.use("/files",fileUpload);




// listening on port 3501
app.listen(3501,async()=>{
    try {
        await db.sequelize.sync();
        console.log("Connected to dB");
    } catch (error) {
        console.log(error);
    }
    console.log("Server running at http://localhost:3501");
})



