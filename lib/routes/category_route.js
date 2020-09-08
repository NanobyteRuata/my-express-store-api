const router = require('express').Router();
var categoryController = require('../controllers/category_controller');

router.route('/')
    .get(categoryController.index)
    .post(categoryController.new);

router.route('/:category_id')
    .get(categoryController.view)
    .patch(categoryController.update)
    .put(categoryController.update)
    .delete(categoryController.delete);

module.exports = router;