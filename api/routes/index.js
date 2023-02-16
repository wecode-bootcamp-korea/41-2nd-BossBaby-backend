const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const mypageRouter = require('./mypageRouter');
const orderRouter = require('./orderRouter');

router.use('/auth', userRouter.router);
router.use('/products', productRouter.router);
router.use('/mypage', mypageRouter.router);
router.use('/orders', orderRouter.router);

module.exports = router;
