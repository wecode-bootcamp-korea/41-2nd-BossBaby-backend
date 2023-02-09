const mypageDao = require('../models/mypageDao');

const getSellerInfo = async (userId) => {
  const sellerId = await mypageDao.getSellerId(userId);
  const result = await mypageDao.getSellerInfo(sellerId.id, userId);
  return result;
};

const getSellerReview = async (userId) => {
  const sellerId = await mypageDao.getSellerId(userId);

  const result = await mypageDao.getSellerReview(sellerId.id);
  return result;
};

const getLikesList = async (userId) => {
  const result = await mypageDao.getLikesList(userId);
  return result;
};

const getSellingProducts = async (userId) => {
  const sellerId = await mypageDao.getSellerId(userId);

  const result = await mypageDao.getSellingProducts(sellerId.id, userId);
  return result;
};

const getOrderProducts = async (userId) => {
  const result = await mypageDao.getOrderProducts(userId);
  return result;
};

module.exports = {
  getSellerInfo,
  getSellerReview,
  getLikesList,
  getSellingProducts,
  getOrderProducts,
};
