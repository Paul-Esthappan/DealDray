const express = require('express')
const router = express.Router();
const { postCreateDetails, loginuser, getIdDetails } = require('../controllers/authController');
const { verifyTokenandAuthorization, verifyToken } = require('../token/verifyToken');

//CREATE USER
router.post('/signup',postCreateDetails)
//SIGN IN
router.post('/signin', loginuser)
//GETUSER
router.get('/user/:id',verifyTokenandAuthorization,verifyToken,getIdDetails)



module.exports = router
