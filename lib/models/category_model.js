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
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: null,
    }
});

const Category = module.exports = mongoose.model('category', categorySchema);
module.exports.get = function (callback, limit) {
    Category.find(callback).limit(limit);
}