const Brand = require('../models/brand_model');

// Get all brands
exports.index = function (req, res) {
    Brand.get(function (err, brands) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        else
            res.json({
                status: "success",
                message: "Brands retrieved successfully.",
                data: brands
            });
    });
};

// Create new brand
exports.new = function (req, res) {
    var brand = new Brand();
    brand.name = req.body.name;
    brand.image_url = req.body.image_url;

    brand.save(function (err) {
        if (err)
            res.json({
                status: "error",
                message: err,
            });
        else
            res.json({
                status: "success",
                message: 'New brand created!',
                data: brand
            });
    });
};

exports.view = function (req, res) {
    Brand.findOne({ _id: req.params.brand_id }, function (err, brand) {
        if (err)
            res.json({
                status: "error",
                message: err,
            });
        else
            res.json({
                status: "success",
                message: 'Brand retrieved successfully.',
                data: brand
            });
    });
};

exports.update = function (req, res) {
    Brand.findOne({ _id: req.params.brand_id }, function (err, brand) {
        if (err)
            res.json({
                status: "error",
                message: err,
            });
        else {
            brand.name = req.body.name ? req.body.name : brand.name;
            brand.image_url = req.body.image_url ? req.body.image_url : brand.image_url;
            brand.updated_at = (new Date()).toISOString();

            brand.save(function (err) {
                if (err)
                    res.json({
                        status: "error",
                        message: err,
                    });
                else
                    res.json({
                        message: 'Brand Info updated',
                        data: brand
                    });
            });
        }
    });
};
exports.delete = function (req, res) {
    Brand.findOne({
        _id: req.params.brand_id
    }, function (err, brand) {
        if (err)
            res.json({
                status: "error",
                message: err,
            });
        else 
            brand.is_active = false;
            brand.inactive_at = (new Date()).toISOString();
            brand.save(function (err) {
                if (err)
                    res.json({
                        status: "error",
                        message: err
                    });
                else
                    res.json({
                        status: "success",
                        message: 'Brand deleted.'
                    });
            });
    });
};