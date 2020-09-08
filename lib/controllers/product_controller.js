const Product = require('../models/product_model');

// Get all products
exports.index = function (req, res) {
    Product.get(function (err, products) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        else
            res.json({
                status: "success",
                message: "Products retrieved successfully.",
                data: products
            });
    });
};

// Create new product
exports.new = function (req, res) {
    var product = new Product();
    product.name = req.body.name;
    product.images = req.body.images;
    product.details = req.body.details;
    product.delivery_info = req.body.delivery_info;
    product.waiting_time = req.body.waiting_time;
    product.price = req.body.price;
    product.discount_price = req.body.discount_price;
    product.category = req.body.category;
    product.brand = req.body.brand;
    product.stock = req.body.stock;

    product.save(function (err) {
        if (err)
            res.json({
                status: "error",
                message: err,
            });
        else
            res.json({
                status: "success",
                message: 'New product created!',
                data: product
            });
    });
};

exports.view = function (req, res) {
    Product.findOne({ _id: req.params.product_id }, function (err, product) {
        if (err)
            res.json({
                status: "error",
                message: err,
            });
        else
            res.json({
                status: "success",
                message: 'Product retrieved successfully.',
                data: product
            });
    });
};

exports.update = function (req, res) {
    Product.findOne({ _id: req.params.product_id }, function (err, product) {
        if (err)
            res.json({
                status: "error",
                message: err,
            });
        else {
            product.name = req.body.name ? req.body.name : product.name;
            product.images = req.body.images ? req.body.images : product.images;
            product.details = req.body.details ? req.body.details : product.details;
            product.delivery_info = req.body.delivery_info ? req.body.delivery_info : product.delivery_info;
            product.waiting_time = req.body.waiting_time ? req.body.waiting_time : product.waiting_time;
            product.price = req.body.price ? req.body.price : product.price;
            product.discount_price = req.body.discount_price ? req.body.discount_price : product.discount_price;
            product.category = req.body.category ? req.body.category : product.category;
            product.brand = req.body.brand ? req.body.brand : product.brand;
            product.stock = req.body.stock ? req.body.stock : product.stock;
            product.updated_at = Date.now();

            product.save(function (err) {
                if (err)
                    res.json({
                        status: "error",
                        message: err,
                    });
                else
                    res.json({
                        message: 'Product Info updated',
                        data: product
                    });
            });
        }
    });
};
exports.delete = function (req, res) {
    Product.remove({
        _id: req.params.product_id
    }, function (err, product) {
        if (err)
            res.json({
                status: "error",
                message: err,
            });
        else 
            res.json({
                status: "success",
                message: 'Product deleted.'
            });
    });
};