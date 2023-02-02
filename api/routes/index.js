const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");

router.use("/auth", userRouter.router);

module.exports = router;
