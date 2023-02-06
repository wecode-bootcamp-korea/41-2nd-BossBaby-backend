const express = require("express");
const router = express.Router();
const { validateToken } = require("../utils/auth");

const orderController = require("../controllers/orderController");

router.post("", validateToken, orderController.postOrder);

module.exports = { router };
