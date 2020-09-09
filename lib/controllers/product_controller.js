const Product = require('../models/product_model');
const Category = require('../models/category_model');
const Brand = require('../models/brand_model');

// Get products
exports.index =  async(req, res) => {
    // destructure page and limit and set default values
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const brand_id = req.query.brand_id ? req.query.brand_id : null;
    const category_id = req.query.category_id ? req.query.category_id : null;

    let condition = {};
    if(category_id) condition["category.id"] = category_id;
    if(brand_id) condition["brand.id"] = brand_id;

    if(!brand_id && !category_id) {
        res.json({
            status: "error",
            message: "You need to be more specific with type of products you request.",
        });
    } else {
        console.log(condition);
        try {
            // execute query with page and limit values
            const products = await Product.find(condition)
                .limit(limit)
                .skip((page - 1) * limit)
                .exec();
    
            // get total documents in the Products collection 
            const count = await Product.find(condition).countDocuments();
    
            res.json({
                status: "success",
                message: "Products retrieved successfully.",
                current_page: page,
                total_pages: Math.ceil(count / limit),
                limit: limit,
                total: count,
                data: products
            });
        } catch (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
    }
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
            product.updated_at = (new Date()).toISOString();

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
    Product.findOne({
        _id: req.params.product_id
    }, function (err, product) {
        if (err)
            res.json({
                status: "error",
                message: err,
            });
        else
            product.is_active = false;
        product.inactive_at = (new Date()).toISOString();
        product.save(function (err) {
            if (err)
                res.json({
                    status: "error",
                    message: err
                });
            else
                res.json({
                    status: "success",
                    message: 'Product deleted.'
                });
        });
    });
};