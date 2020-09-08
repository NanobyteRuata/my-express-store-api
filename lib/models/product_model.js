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
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
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

const Product = module.exports = mongoose.model('product', productSchema);
module.exports.get = function (callback, limit) {
    Product.find(callback).limit(limit);
}