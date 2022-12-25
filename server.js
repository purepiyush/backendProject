const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoute')
const cors = require("cors");



dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.send('welcome to home page');
})

app.use("/user",userRouter);
app.get('*',(req,res)=>{
    res.status(404).json({err : "this route not defined"})
})


mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connected db")
    app.listen(process.env.PORT,()=>{
        console.log("server running at 5000");
    });
})
