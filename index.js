require('dotenv').config();

const express = require('express');
var cors = require('cors');

const { dbConnection } = require('./database/config');

//Create server
const app = express();
//CORS
app.use(cors());
//Parse JSON
app.use(express.json());
//DB
dbConnection();
//Routes
app.use('/api/users', require('./routes/users'));

app.use('/api/login', require('./routes/auth'));


app.listen(process.env.PORT,()=>{
    console.log('Up server in port:' + process.env.PORT);
})