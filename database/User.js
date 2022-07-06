const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name: {
        trim: true,
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
}, {timestamps: true});

module.exports = model('users', UserSchema);
