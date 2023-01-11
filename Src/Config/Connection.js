//DB connection;
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', false);
const Link = 'mongodb://localhost:27017/Auth';

//Make a connection;
mongoose.connect(`${Link}`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('DB connected Done');
}).catch((error) => {
    console.log(error);
})