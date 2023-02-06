const orderService = require("../services/orderService");
const { catchAsync } = require("../middlewares/error");
const { detectError } = require("../utils/detectError");

const postOrder = catchAsync(async (req, res) => {
  const userId = req.userId;
  if (!userId) detectError("POST_ORDER_ERROR", 400);

  const { address, totalprice, productId } = req.body;

  await orderService.postOrder(userId, address, totalprice, productId);
  return res.status(201).json({ message: "ORDER_SUCCESS" });
});

module.exports = {
  postOrder,
};
