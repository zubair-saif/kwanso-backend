const mongoose = require('mongoose');
const joi = require('joi');

const schema = new mongoose.Schema({

    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});

function validate(users) {
    const schema = {
        email: joi.string().email().required(),
        password: joi.string().required(),
    }
    return joi.validate(users, schema);
}

const Users = mongoose.model('users', schema);
module.exports.validate = validate;
module.exports.Users = Users;
