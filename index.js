require('dotenv').config();

const express = require('express');
var cors = require('cors');

const { dbConnection } = require('./database/config');

//Create server
const app = express();
//CORS
app.use(cors())
//DB
dbConnection();
//Routes
app.get('/',(req,res)=>{
    
});


app.listen(process.env.PORT,()=>{
    console.log('Up server in port:' + process.env.PORT);
})