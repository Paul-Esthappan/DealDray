const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require("../models/t_login");

//@desc POST Create a new User account
//@route POST /api/auth/signup
//@acess public
const postCreateDetails = async (req, res) => {
  try {
   
    const { userName, pwd} = req.body;
    const isExistUser = await User.findOne({ userName });

    if (!userName ||!pwd) {
      res.status(400);
      throw new Error("All fields are required");
    } else if (isExistUser) {
      res.status(400).send("User already exists");
    } else {
      const hashedPassword = await bcrypt.hash(pwd, 10);

      const userDetails = new User({
        userName,
        pwd: hashedPassword,
      });
      await userDetails.save();
      return res.status(200).send("User Registered. Please login to continue");
    }
  } catch (error) {
    console.error("Error occurred", error);
    res.status(400).send("Error occurred: " + error.message);
  }
};


//@desc POST User login here
//@route POST /api/auth/signin
//@acess privite

const loginuser = async (req, res) => {
  try {
    const { userName, pwd } = req.body;
    console.log(req.body);
    const userData = await User.findOne({ userName });

    if (!userData) {
      return res.status(401).send("Username is invalid");
    }
    const isPasswordValid = await bcrypt.compare(pwd, userData.pwd);
    console.log("userdatapsw-", userData.pwd,"psw",pwd,"ispswalid",isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).send("Password is invalid");
    }

    // Exclude password from the user data
    const userWithoutPassword = {
      _id: userData._id,
      userName: userData.userName,
    };

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

    if (!JWT_SECRET_KEY) {
      console.error("JWT secret key not found");
      return res.status(500).send("Internal Server Error");
    }

    jwt.sign(userWithoutPassword, JWT_SECRET_KEY, { expiresIn: 186400 }, (err, token) => {
      if (err) {
        console.error("Error signing JWT:", err);
        res.status(500).send("Internal Server Error");
      } else {
        res.status(200).json({ user: userWithoutPassword, token });
        console.log(userWithoutPassword);
      }
    });
  } catch (error) {
    console.error("Error occurred", error);
    res.status(500).send("Internal Server Error");
  }
};



//@desc GET acess UserDetails
//@route GET /api/auth/user/:id
//@acess privite

const getIdDetails = async (req, res, next) => {
    try {
       const findUser = await User.findById(req.params.id?.toString());
      if (req.params.id) {
        const userWithoutPassword = {
        _id: findUser._id,
        userName: findUser.userName,
        };  
        res.status(202).json(userWithoutPassword)
      }      
    } catch (error) {
        next(error)
    }
}

module.exports = { loginuser,postCreateDetails, getIdDetails }