const mongoose = require("mongoose");

const RegisterSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type : String,
        required : true
    },
    contactNumber: String
});

module.exports = mongoose.model('users', RegisterSchema);