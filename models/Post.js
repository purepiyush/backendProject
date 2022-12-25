const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    postId:{
        type : mongoose.Schema.Types.ObjectId,
    },
    post:{
        type : String,
        required : [true,"post can not be empty"],
        trim : true
    }
},{timestamps:true})

const Post = mongoose.model("post",postSchema);

module.exports = Post;