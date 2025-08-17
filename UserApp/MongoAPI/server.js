const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/UserDB",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>console.log("MongoDb Connected Successfully!!!"))
.catch((err)=>console.log(err)
);


const schema = new mongoose.Schema({
    name:String,
    email:String,
});

const User = mongoose.model("User",schema);


app.get("/",(request,response)=>{
    response.send("Welcome to my First React Web API");
})

app.get("/users",async(request,response)=>{
    const users = await User.find();
    response.json(users);
});

app.post("/users",async(request,response)=>{
    const user = new User(request.body);
    await user.save();
    response.json(user);
});

const port = 5000;
app.listen(port,()=> console.log("Server is now loading in port 5000"));

