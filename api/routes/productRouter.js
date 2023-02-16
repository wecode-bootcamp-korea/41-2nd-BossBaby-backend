const express = require('express');
const upload = require('../utils/upload');
const productController = require('../controllers/productController');
const { validateToken, validateTokenForPublic } = require('../utils/auth');

const router = express.Router();

router.post('', validateToken, upload, productController.postSellerProduct);
router.get('', productController.getProductList);
router.get('/count', productController.countProductList);
router.get('/detail/:productId', validateTokenForPublic, productController.getProductDetailByUserId);
router.get('/seller/info/:productId', productController.getSellerInfo);
router.get('/seller/review/:productId', productController.getSellerReview);
router.put('/likes/:productId', validateToken, productController.updateProductLikes);
router.put('/views/:productId', productController.updateProductViews);
router.get('/main/recommend', productController.getRecommendList);
router.get('/main/recent', productController.getRecentList);
router.get('/search', productController.searchProductList);

module.exports = {
  router,
};
