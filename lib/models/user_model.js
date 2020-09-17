// server/models/userModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ["user", "admin"]
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    access_token: {
        type: String
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    created_at: {
        type: String,
        default: (new Date()).toISOString(),
    },
    updated_at: {
        type: String,
        default: null,
    },
    inactive_at: {
        type: String,
        default: null,
    }
});

const User = module.exports = mongoose.model('user', UserSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}