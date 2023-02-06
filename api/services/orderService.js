const orderDao = require("../models/orderDao");

const postOrder = async (userId, address, totalprice, productId) => {
  return orderDao.postOrder(userId, address, totalprice, productId);
};

module.exports = {
  postOrder,
};
