const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());      
app.use(cors({origin:"*"}));   //handling cors



app.get("/",(req,res)=>{
    res.send("Welcome to backend side of the Application");
})





// listening on port 3501
app.listen(3501,async()=>{
    console.log("Server running at http://localhost:3501");
})



