const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    delivery_info: {
        type: String,
        required: true,
    },
    waiting_time: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount_price: {
        type: Number,
        default: "",
    },
    category: {
        type: {
            id: String,
            name: String,
            filterable_values: [{
                filterable_id: String,
                filterable_name: String,
                filterable_value: String,
            }]
        },
        required: true,
    },
    brand: {
        type: {
            id: String,
            name: String,
            image_url: String
        },
        required: true,
    },
    stock: {
        type: Number,
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
        default: null,
    },
    inactive_at: {
        type: String,
        default: null,
    }
});

const Product = module.exports = mongoose.model('product', productSchema);
module.exports.get = function (callback, limit) {
    Product.find(callback).limit(limit);
}