const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: true,
    },
    filterable_list: {
        type: [{
            id: {
                type: String,
            },
            name: {
                type: String,
                required: true
            },
            values: {
                type: [String],
                required: true,
            }
        }]
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

const Category = module.exports = mongoose.model('category', categorySchema);
module.exports.get = function (callback, limit) {
    Category.find(callback).limit(limit);
}