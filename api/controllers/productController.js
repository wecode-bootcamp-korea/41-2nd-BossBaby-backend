const productService = require('../services/productService');
const { catchAsync } = require('../middlewares/error');

const postSellerProduct = catchAsync(async (req, res) => {
  const { title, images, price, description, region, exchangeable, subCategoryId, conditionId } = req.body;

  if (!title || !images || !price || !description || !region || !exchangeable || !subCategoryId || !conditionId) {
    return res.status(400).json({ message: 'INPUT_ERROR' });
  }
  await productService.postSellerProduct(title, images, price, description, region, exchangeable, subCategoryId, conditionId, req.userId.userId.id);
  return res.status(200).json({ message: '판매상품_등록완료' });
});

const getProductList = catchAsync(async (req, res) => {
  const { subCategory, sort, offset, limit } = req.query;

  if (!subCategory) {
    return res.status(400).json({ message: 'INPUT_ERROR' });
  }

  const result = await productService.getProductList(subCategory, sort, offset, limit);
  return res.status(200).json({ productList: result });
});

const countProductList = catchAsync(async (req, res) => {
  const { subCategory } = req.query;

  if (!subCategory) {
    return res.status(400).json({ message: 'INPUT_ERROR' });
  }

  const result = await productService.countProductList(subCategory);
  return res.status(200).json(result);
});

const getProductDetailByUserId = catchAsync(async (req, res) => {
  const userId = req.userId ? req.userId.userId.id : undefined;
  const { productId } = req.params;
  const result = await productService.getProductDetailByUserId(productId, userId);
  return res.status(200).json({ productDetail: result });
});

const getSellerInfo = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await productService.getSellerInfo(productId);
  return res.status(200).json({ sellerInfo: result });
});

const getSellerReview = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await productService.getSellerReview(productId);
  return res.status(200).json({ sellerReview: result });
});

const updateProductLikes = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const userId = req.userId.userId.id;
  const result = await productService.updateProductLikes(productId, userId);
  return res.status(200).json(result);
});

const updateProductViews = catchAsync(async (req, res) => {
  const { productId } = req.params;
  await productService.updateProductViews(productId);
  return res.status(200).json({ message: 'VIEW_UPDATED' });
});

const getRecommendList = catchAsync(async (req, res) => {
  const result = await productService.getRecommendList();
  return res.status(200).json(result);
});

const getRecentList = catchAsync(async (req, res) => {
  const result = await productService.getRecentList();
  return res.status(200).json(result);
});

const searchProductList = catchAsync(async (req, res) => {
  const { subCategory, sort, offset, limit, search } = req.query;
  if (!sort) {
    const sort = 'recent';
    return await productService.searchProductList(subCategory, sort, offset, limit, search);
  }
  const result = await productService.searchProductList(subCategory, sort, offset, limit, search);
  return res.status(200).json(result);
});

module.exports = {
  postSellerProduct,
  getProductList,
  countProductList,
  getProductDetailByUserId,
  getSellerInfo,
  getSellerReview,
  updateProductLikes,
  updateProductViews,
  getRecommendList,
  getRecentList,
  searchProductList,
};
