const mongoose = require('mongoose');
const Joi = require('joi');

const schema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    __v: { type: Number, select: false }
});

const Task = mongoose.model('task', schema);
function validate(task) {
    const schema = {
        name: Joi.string().required(),
    };
    return Joi.validate(task, schema);
}
module.exports.validate = validate;
module.exports.Task = Task;
