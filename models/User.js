const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true,'name is required'],
        trim : true
    },
    email : {
        type : String,
        unique : [true,"this email already registered"],
        required : [true,'email is required'],
        trim : true,

    },
    password : {
        type : String,
        required : [true,'password is required'],
    }
},{timestamps : true});

const User = mongoose.model('user',userSchema)

module.exports = User;
