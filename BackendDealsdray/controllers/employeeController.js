const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Employee = require('../models/t_employee');
const { verifyToken } = require('../token/verifyToken');


// Multer configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'C:/codes/MERN_Projects/Machine Test/DealsdrayTest/dealsdray/public/avatar'); // Avatar upload directory
    },
    filename: function (req, file, cb) {
        const fileExtension = path.extname(file.originalname); // Get the file extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    }
});
// File type validation
const fileFilter = (req, file, cb) => {
    const extname = path.extname(file.originalname).toLowerCase();
    const allowedFileTypes = ['.jpg', '.jpeg', '.png'];
    if (allowedFileTypes.includes(extname)) {
        cb(null, true);
    } else {
        cb(new Error('Only JPG and PNG files are allowed'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

//@desc POST add employee
//@route POST /api/employee/add
//@access public


async function addEmployee(req, res) {
    try {
        // Destructure fields from req.body
        const { name, email, mobile, designation, gender, course, active } = req.body;

        // Check if all required fields are provided
        if (!name || !email || !mobile || !designation || !gender || !course) {
            res.status(400);
            throw new Error("All fields are required");
        }

        // Check if user with the same mobile number already exists
        const isExistUser = await Employee.findOne({ mobile });
        if (isExistUser) {
            return res.status(400).send("User already exists");
        } 

        // Create new Employee instance
        const employeeDetails = new Employee({
            image: req.file ? req.file.path : '', // Check if file was uploaded
            name,
            email,
            mobile,
            designation,
            gender,
            course,
            active
        });

        await employeeDetails.save();
        return res.status(202).json(employeeDetails);
    } catch (error) {
        console.error("Error occurred", error);
        res.status(400).send("Error occurred: " + error.message);
    }
}



    
//@desc update/edit details with id
//@route PUT /api/employee/edit/:id
//@acess privite

const putUpdate = async (req, res, next) => {
    try {
        const { name, email, mobile, designation, gender, course, active } = req.body;

        // Check if the user already exists
        const existingEmployee = await Employee.findById(req.params.id);

        if (!existingEmployee) {
            res.status(400);
            throw new Error("User not found");
        }

        // Update user details
        existingEmployee.image = req.file ? req.file.path : existingEmployee.image;
        existingEmployee.name = name || existingEmployee.name;
        existingEmployee.email = email || existingEmployee.email;
        existingEmployee.mobile = mobile || existingEmployee.mobile;
        existingEmployee.designation = designation || existingEmployee.designation;
        existingEmployee.gender = gender || existingEmployee.gender;
        existingEmployee.course = course || existingEmployee.course;
        existingEmployee.active = active || existingEmployee.active;

        await existingEmployee.save();
        res.status(200).json(existingEmployee);
    } catch (error) {
        console.error("Error occurred", error);
        res.status(400).send("Error occurred: " + error.message);
    }
};



//@desc delete employee with id
//@route  /api/employee/delete/:id
//@acess  privite

const deleteDetails = async(req, res, next) => {
try {
        await Employee.findByIdAndDelete(req.params.id)
        res.status(200).json("Emloyee deleted")
    } catch (error) {
        res.status(500).json(error)
    }
}

//@desc Search employees
//@route GET /api/employee/search
//@access public
const searchEmployees = async (req, res) => {
    try {
        const searchQuery = req.query.q; // Get the search query from request query parameters

        // Perform the search using a regular expression to match any field
        const employees = await Employee.find({
            $or: [
                { name: { $regex: searchQuery, $options: 'i' } },
                { email: { $regex: searchQuery, $options: 'i' } },
                { mobile: { $regex: searchQuery, $options: 'i' } },
                { designation: { $regex: searchQuery, $options: 'i' } },
                { gender: { $regex: searchQuery, $options: 'i' } },
                { course: { $regex: searchQuery, $options: 'i' } } 
            ]
        });

        res.status(200).json(employees);
    } catch (error) {
        console.error("Error occurred", error);
        res.status(500).json({ message: "Server Error" });
    }
};



//@desc Search and sort employees
//@route GET /api/employee/search/sort
//@access public
const searchAndSortEmployees = async (req, res) => {
    try {
        const searchQuery = req.query.q; // Get the search query from request query parameters
        const sortBy = req.query.sortBy; // Get the field to sort by from request query parameters

        let sortOptions = {};
        if (sortBy) {
            // Define sort options based on sortBy query parameter
            if (sortBy === 'name' || sortBy === 'email' || sortBy === 'mobile' || sortBy === 'designation' || sortBy === 'gender' || sortBy === 'course') {
                sortOptions[sortBy] = 1; // Sort in ascending order
            } else {
                return res.status(400).json({ message: "Invalid sort field" });
            }
        }

        // Perform the search and sort using a regular expression to match any field
        const employees = await Employee.find({
            $or: [
                { name: { $regex: searchQuery, $options: 'i' } },
                { email: { $regex: searchQuery, $options: 'i' } },
                { mobile: { $regex: searchQuery, $options: 'i' } },
                { designation: { $regex: searchQuery, $options: 'i' } },
                { gender: { $regex: searchQuery, $options: 'i' } },
                { course: { $regex: searchQuery, $options: 'i' } } 
            ]
        }).sort(sortOptions); // Sort the results based on sortOptions

        res.status(200).json(employees);
    } catch (error) {
        console.error("Error occurred", error);
        res.status(500).json({ message: "Server Error" });
    }
};

//@desc Get all employees
//@route GET /api/employee/all
//@access public
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();

        res.status(200).json(employees);
    } catch (error) {
        console.error("Error occurred", error);
        res.status(500).json({ message: "Server Error" });
    }
};
//@desc Get employee by id
//@route GET /api/employee/:id
//@access public
const getEmployeeByID = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json(employee);
    } catch (error) {
        console.error("Error occurred", error);
        res.status(500).json({ message: "Server Error" });
    }
};



module.exports = { addEmployee, upload, putUpdate, deleteDetails, searchEmployees, searchAndSortEmployees, getAllEmployees , getEmployeeByID};
