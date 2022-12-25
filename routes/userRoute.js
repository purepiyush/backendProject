const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authUser = require("../middleware/auth");
const Post = require("../models/Post");

router.post("/register",async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        if(!email || !name || !password){
            return res.json({msg : "please fill all the fields"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);
        const user = await User.create({name,email,password:hashPassword});
        const token = jwt.sign({
            id:user._id
        },process.env.jwtsecretkey)
        res.status(201).json({user,token});
    } catch (error) {
        res.status(500).json({error : error.message})
    }
})

router.get("/login",async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.json({msg : "please fill all the fields"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({err : 'this user does not exist'})
        }
        const compare = await bcrypt.compare(password,user.password); //true or false
        if(!compare){
            return res.status(400).json({err : 'wrong user or password'});
        }
        const token = jwt.sign({
            id:user._id
        },process.env.jwtsecretkey)
        res.status(200).json({token})

    } catch (error) {
        res.status(500).json({error : error.message})
    }
})

router.post("/post",authUser,async(req,res)=>{
    try {
        const user = req.user
        const post = req.body.post
        if(!post)
            return res.status(400).json({err : "post can not be empty"})
        const newPost = await Post.create({postId:user._id,post})
        return res.status(201).json(newPost)
    } catch (error) {
        res.status(500).json({error : error.message})
    }
})

router.get("/mypost",authUser,async(req,res)=>{
    try {
        const user = req.user;
        const posts = await Post.find({postId:user._id}).select("post createdAt updatedAt")
        return res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({error : error.message})
    }
})

router.get("/allpost",authUser,async(req,res)=>{
    try {
        const user = req.user;
        const posts = await Post.find({}).select("post createdAt updatedAt")
        return res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({error : error.message})
    }
})

router.get("/",async(req,res)=>{
    const posts = await Post.find({}).select("post createdAt updatedAt")  //for selecting few items from object
    return res.status(200).json(posts)
})


module.exports = router;