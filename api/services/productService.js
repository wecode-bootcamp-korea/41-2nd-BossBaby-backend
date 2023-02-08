const productDao = require('../models/productDao');

const postSellerProduct = async (title, images, price, description, region, exchangeable, subCategoryId, conditionId, userId) => {
  const [seller] = await productDao.getSellerId(userId);
  if (!seller) {
    await productDao.registerSeller(userId);
    const [seller] = await productDao.getSellerId(userId);
    return await productDao.postSellerProduct(title, images, price, description, region, exchangeable, subCategoryId, conditionId, userId, seller.id);
  }
  const result = await productDao.postSellerProduct(
    title,
    images,
    price,
    description,
    region,
    exchangeable,
    subCategoryId,
    conditionId,
    userId,
    sellerExist.id
  );
  return result;
};

const getProductList = async (subCategory, sort, offset, limit) => {
  if (!sort) {
    const sort = 'recent';
    const result = await productDao.getProductList(subCategory, sort, offset, limit);
    return result;
  }
  const result = await productDao.getProductList(subCategory, sort, offset, limit);
  return result;
};

const countProductList = async (subCategory) => {
  const result = await productDao.countProductList(subCategory);
  return result;
};

const getProductDetailByUserId = async (productId, userId) => {
  if (!userId) {
    const result = await productDao.getProductDetailByUserId(productId, null);
    return result;
  }
  const [likeExist] = await productDao.getLikesId(productId, userId);
  if (!likeExist) {
    const exist = false;
    const result = await productDao.getProductDetailByUserId(productId, exist);
    return result;
  }
  const exist = true;
  const result = await productDao.getProductDetailByUserId(productId, exist);
  return result;
};

const getSellerInfo = async (productId) => {
  const result = await productDao.getSellerInfo(productId);
  return result;
};

const getSellerReview = async (productId) => {
  const result = await productDao.getSellerReview(productId);
  return result;
};

const updateProductLikes = async (productId, userId) => {
  const [existId] = await productDao.getLikesId(productId, userId);
  if (!existId) {
    const result = await productDao.addProductLikes(productId, userId);
    return result;
  }
  const result = await productDao.subtractProductLikes(productId, userId);
  return result;
};

const updateProductViews = async (productId) => {
  const result = await productDao.updateProductViews(productId);
  return result;
};

const getRecommendList = async (offset, limit) => {
  if (!offset || !limit) {
    const result = await productDao.getRecommendList(0, 3);
    return result;
  }
  const result = await productDao.getRecommendList(offset, limit);
  return result;
};

const getRecentList = async (offset, limit) => {
  if (!offset || !limit) {
    const result = await productDao.getRecentList(0, 12);
    return result;
  }
  const result = await productDao.getRecentList(offset, limit);
  return result;
};

const searchProductList = async (subCategory, sort, offset, limit, search) => {
  const result = await productDao.searchProductList(subCategory, sort, offset, limit, search);
  return result;
};

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
