const express = require('express');
const mypageController = require('../controllers/mypageController');
const { validateToken } = require('../utils/auth');

const router = express.Router();

router.get('/user/info', validateToken, mypageController.getSellerInfo);
router.get('/seller/reviews', validateToken, mypageController.getSellerReview);
router.get('/likes', validateToken, mypageController.getLikesList);
router.get('/selling', validateToken, mypageController.getSellingProducts);
router.get('/orders', validateToken, mypageController.getOrderProducts);
router.put('/status', validateToken, mypageController.updateProductStatus);

module.exports = {
  router,
};
