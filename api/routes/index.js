const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter")
const orderRouter = require("./orderRouter");

router.use("/auth", userRouter.router)
router.use("/orders", orderRouter.router);

module.exports = 
  router
