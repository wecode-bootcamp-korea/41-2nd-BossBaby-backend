const mypageService = require('../services/mypageService');
const { catchAsync } = require('../middlewares/error');

const getSellerInfo = catchAsync(async (req, res) => {
  const userId = req.userId.id;
  const result = await mypageService.getSellerInfo(userId);
  return res.status(200).json({ userInfo: result });
});

const getSellerReview = catchAsync(async (req, res) => {
  const userId = req.userId.id;
  const result = await mypageService.getSellerReview(userId);
  return res.status(200).json({ sellerReviews: result });
});

const getLikesList = catchAsync(async (req, res) => {
  const userId = req.userId.id;

  const result = await mypageService.getLikesList(userId);
  return res.status(200).json({ products: result });
});

const getSellingProducts = catchAsync(async (req, res) => {
  const userId = req.userId.id;
  const result = await mypageService.getSellingProducts(userId);
  return res.status(200).json({ products: result });
});

const getOrderProducts = catchAsync(async (req, res) => {
  const userId = req.userId.id;
  const result = await mypageService.getOrderProducts(userId);
  return res.status(200).json({ products: result });
});

const updateProductStatus = catchAsync(async (req, res) => {
  const { productId, status } = req.body;
  const result = await mypageService.updateProductStatus(productId, status);
  return res.status(200).json({ message: 'STATUS_UPDATED' });
});

module.exports = {
  getSellerInfo,
  getSellerReview,
  getLikesList,
  getSellingProducts,
  getOrderProducts,
  updateProductStatus,
};
