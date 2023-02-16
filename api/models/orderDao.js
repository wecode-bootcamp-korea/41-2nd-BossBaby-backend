const { appDataSource } = require('./appDataSource');

// order 상태
const OrderStatusEnum = Object.freeze({
  SELLING: 1,
  IN_RESERVATION: 2,
  RESERVATION_COMPLETED: 3,
  ORDER_DONE: 4,
});

const postOrder = async (userId, address, totalprice, productId) => {
  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    `
      INSERT INTO orders(
        user_id,
        address,
        total_price,
        product_id,
        order_status_id
      ) VALUES ( ?, ?, ?, ?, ${OrderStatusEnum[ORDER_DONE]})
    `,
      [userId, address, totalprice, productId];
    
      await queryRunner.query(
        `
          UPDATE
            users
          SET
            points = points - ${totalprice}
          WHERE
            id = ?
        `,
        [userId]
      );

    await queryRunner.commitTransaction(console.log('transaction_commit'));
  } catch (error) {
    await queryRunner.rollbackTransaction(console.log('transaction_rollback'));
    throw error;
  } finally {
    await queryRunner.release(console.log('transaction_end'));
  }
};

module.exports = { postOrder };
