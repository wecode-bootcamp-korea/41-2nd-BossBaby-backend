const userDao = require("../models/userDao");
const orderDao = require("../models/orderDao");
const { detectError } = require("../utils/detectError");

// 결제
const postOrder = async (userId, address, totalprice, productId) => {
  const userInfo = await userDao.userInfo(userId);
  if (userInfo.points - totalprice < 0)
    detectError("NOT_ENOUGH_POINTS", 400);

  const orderId = await orderDao.postOrder(
    userId,
    address,
    totalprice,
    productId
  );

  return orderId;
};

module.exports = {
  postOrder,
};
