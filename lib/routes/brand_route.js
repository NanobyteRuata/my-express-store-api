const router = require('express').Router();
var brandController = require('../controllers/brand_controller');

router.route('/')
    .get(brandController.index)
    .post(brandController.new);

router.route('/:brand_id')
    .get(brandController.view)
    .patch(brandController.update)
    .put(brandController.update)
    .delete(brandController.delete);

module.exports = router;