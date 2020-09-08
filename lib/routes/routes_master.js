const product_route = require('./product_route');
const category_route = require('./category_route');
const router = require('express').Router();

router.route('/products', product_route);
router.route('/categories', category_route);

module.exports = router;