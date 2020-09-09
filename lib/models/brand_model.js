const mongoose = require("mongoose");

const brandSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: true,
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
        default: null
    },
    inactive_at: {
        type: String,
        default: null,
    }
});

const Brand = module.exports = mongoose.model('brand', brandSchema);
module.exports.get = function (callback, limit) {
    Brand.find(callback).limit(limit);
}