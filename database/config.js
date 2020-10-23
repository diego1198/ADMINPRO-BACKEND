const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DB_CON,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });
        console.log('DB init succesful');
    } catch (error) {
        console.log(error);
        throw new Error('Error, couldnt init the db');
    }
}

module.exports = {
    dbConnection 
}