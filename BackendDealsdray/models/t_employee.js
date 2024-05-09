const mongoose = require('mongoose');

var T_EmployeeSchema = new mongoose.Schema({
    image: { type: String },
    name: {
        type: String,
        lowercase: true,
        required: [true, "Name can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'Name is invalid'],
        index: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "Email can't be blank"],
        match: [/\S+@\S+\.\S+/, 'Email is invalid'],
        index: true
    },
     mobile: {
         type: String,
         unique: true,
         required: [true, "Email can't be blank"],
         match: [/^\d{10}$/, 'Mobile number is invalid']
    },
    designation: {
        type: String,
        required: [true, "Designation can't be blank"]
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: [true, "Gender can't be blank"]
    },
    course: {
        type: String,
        required: [true, "Course can't be blank"]
    },
    active: {
        type: Boolean,
        default:true
    },
    createDate: {
        type: Date,
        default: Date.now,
        required: [true, "CreatedAt can't be blank"]
    }
}, { timestamps: true });

const T_Employee = mongoose.model('T_Employee', T_EmployeeSchema);
module.exports = T_Employee;
