const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');

router.get('/create', productController.create);
router.post('/store', productController.store);
router.get('/:id/edit', productController.edit);
router.post('/handle-form-actions', productController.handleFormAction);
router.put('/:id', productController.update);
router.patch('/:id/restore', productController.restore);
router.delete('/:id', productController.destroy);
router.delete('/:id/force', productController.forceDestroy);
router.get('/:slug', productController.show);

module.exports = router;
