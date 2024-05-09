const express = require('express');
const router = express.Router();
const { addEmployee, upload, putUpdate, deleteDetails, searchEmployees, searchAndSortEmployees, getAllEmployees, getEmployeeByID } = require('../controllers/employeeController')
const { verifyToken } = require('../token/verifyToken');

router.post('/add', upload.single('image'), verifyToken, addEmployee);
router.put('/edit/:id', upload.single('image'), verifyToken, putUpdate);
router.delete('/delete/:id', verifyToken, deleteDetails)
router.get('/search', searchEmployees)
router.get('/search/sort', searchAndSortEmployees)
router.get('/all', getAllEmployees)
router.get('/:id',getEmployeeByID)

module.exports = router;
