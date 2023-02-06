const { appDataSource } = require("./appDataSource");
const queryRunner = appDataSource.createQueryRunner();

// order 상태
const OrderStatusId = Object.freeze({
  SELLING: 1,
  IN_RESERVATION: 2,
  RESERVATION_COMPLETED: 3,
  ORDER_DONE: 4,
});

const postOrder = async (userId, address, totalPrice, productId) => {
  try {
    await queryRunner.connect();
    await queryRunner.startTransaction();
    await appDataSource.query(
      `
      INSERT INTO orders(
        user_id,
        address,
        total_price,
        product_id,
        order_status_id
      ) VALUES ( ?, ?, ?, ?, ${OrderStatusId.ORDER_DONE})
      `,
      [userId, address, totalPrice, productId]
    );

    await queryRunner.query(
      `
      UPDATE
        users
      SET
        points = points - ${totalPrice}
      WHERE
        id = ?
      `,
      [userId]
    );

    await queryRunner.commitTransaction();
  } catch {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
};

module.exports = { postOrder };
