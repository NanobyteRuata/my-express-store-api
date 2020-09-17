const Category = require('../models/category_model');

// Get all categories
exports.index = function (req, res) {
    Category.get(function (err, categories) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        else
            res.json({
                status: "success",
                message: "Categories retrieved successfully.",
                data: categories
            });
    });
};

// Create new category
exports.new = function (req, res) {
    var category = new Category();
    category.name = req.body.name;
    category.image_url = req.body.image_url;
    category.filterable_list = req.body.filterable_list;

    category.save(function (err) {
        if (err)
            res.json({
                status: "error",
                message: err,
            });
        else
            res.json({
                status: "success",
                message: 'New category created!',
                data: category
            });
    });
};

exports.view = function (req, res) {
    Category.findOne({ _id: req.params.category_id }, function (err, category) {
        if (err)
            res.json({
                status: "error",
                message: err,
            });
        else
            res.json({
                status: "success",
                message: 'Category retrieved successfully.',
                data: category
            });
    });
};

exports.update = function (req, res) {
    Category.findOne({ _id: req.params.category_id }, function (err, category) {
        if (err)
            res.json({
                status: "error",
                message: err,
            });
        else {
            category.name = req.body.name ? req.body.name : category.name;
            category.image_url = req.body.image_url ? req.body.image_url : category.image_url;
            category.filterable_list = req.body.filterable_list ? req.body.filterable_list : category.filterable_list;
            category.updated_at = (new Date()).toISOString();

            category.save(function (err) {
                if (err)
                    res.json({
                        status: "error",
                        message: err,
                    });
                else
                    res.json({
                        message: 'Category Info updated',
                        data: category
                    });
            });
        }
    });
};
exports.delete = function (req, res) {

    //Real delete for test data
    Category.findOneAndDelete({_id: req.params.category_id}, function(err, category) {
        if (err)
            res.json({
                status: "error",
                message: err,
            });
        else
            res.json({
                status: "success",
                message: 'Category deleted.'
            });
    });

    // Soft delete for production
    // Category.findOne({
    //     _id: req.params.category_id
    // }, function (err, category) {
    //     if (err)
    //         res.json({
    //             status: "error",
    //             message: err,
    //         });
    //     else {
    //         category.is_active = false;
    //         category.inactive_at = (new Date()).toISOString();
    //         category.save(function (err) {
    //             if (err)
    //                 res.json({
    //                     status: "error",
    //                     message: err
    //                 });
    //             else
    //                 res.json({
    //                     status: "success",
    //                     message: 'Category deleted.'
    //                 });
    //         });
    //      }
    // });
};