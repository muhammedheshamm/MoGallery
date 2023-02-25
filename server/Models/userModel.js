const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    likedPosts: {
        type: Array,
        required : true
    },
    savedPosts: {
        type: Array,
        required : true
    }
},
{
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User
