const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePic :{
            type : String,
        },
        role: {
            type: String,
            // enum: ["USER", "ADMIN"],
        },
    },
    { timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
