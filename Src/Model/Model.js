//Make a User Auth Model;
const mongoose = require('mongoose');

//Basic Define Data;
const User = new mongoose.Schema({
    Username: {
        type: String,
        require: true,
        collection: String
    },
    Email: {
        type: String,
        require: true,
    },
    Password: {
        type: String,
        require: true
    }
}, { timestamps: true })

//Export;
module.exports = mongoose.model('User', User, 'UserData')