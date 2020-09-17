const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const productController = require('../controllers/product_controller');
const categoryController = require('../controllers/category_controller');
const brandController = require('../controllers/brand_controller');
 
router.post('/signup', userController.signup);
 
router.post('/login', userController.login);
 
router.get('/user/:user_id', userController.allowIfLoggedin, userController.getUser);
 
router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getUsers);
 
router.put('/user/:user_id', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.updateUser);
 
router.delete('/user/:user_id', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);

// Products route
router.route('/products/')
    .get(productController.index)
    .post(userController.allowIfLoggedin, userController.grantAccess('createAny', 'resource'), productController.new);
router.route('/products/:product_id')
    .get(productController.view)
    .patch(userController.allowIfLoggedin, userController.grantAccess('updateAny', 'resource'), productController.update)
    .put(userController.allowIfLoggedin, userController.grantAccess('updateAny', 'resource'), productController.update)
    .delete(userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'resource'), productController.delete);

// Categories route
router.route('/categories/')
    .get(categoryController.index)
    .post(userController.allowIfLoggedin, userController.grantAccess('createAny', 'resource'), categoryController.new);
router.route('/categories/:category_id')
    .get(categoryController.view)
    .patch(userController.allowIfLoggedin, userController.grantAccess('updateAny', 'resource'), categoryController.update)
    .put(userController.allowIfLoggedin, userController.grantAccess('updateAny', 'resource'), categoryController.update)
    .delete(userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'resource'), categoryController.delete);

// Brands route
router.route('/brands/')
    .get(brandController.index)
    .post(userController.allowIfLoggedin, userController.grantAccess('createAny', 'resource'), brandController.new);
router.route('/brands/:brand_id')
    .get(brandController.view)
    .patch(userController.allowIfLoggedin, userController.grantAccess('updateAny', 'resource'), brandController.update)
    .put(userController.allowIfLoggedin, userController.grantAccess('updateAny', 'resource'), brandController.update)
    .delete(userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'resource'), brandController.delete);
 
module.exports = router;