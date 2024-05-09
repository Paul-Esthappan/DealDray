const express = require("express")
const app = express();
const dotenv = require("dotenv").config();
const cors = require('cors')
require ("./connections")


app.use(express.json());
app.use(cors());
app.use('/api/auth', require('./routers/auth'));
app.use('/api/employee', require('./routers/employeeRouter'));
app.use('./avatars', express.static('avatars'));

const port = process.env.PORT || 5101

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})