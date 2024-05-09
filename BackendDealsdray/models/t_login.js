const mongoose = require('mongoose')

var T_LoginSchema = new mongoose.Schema({
    userName: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true
    },
    pwd: {
        type: String,
        required: [true, "can't be blank"],
     },

}, { timestamps: true });

const T_Login = mongoose.model('T_Login', T_LoginSchema)
module.exports = T_Login