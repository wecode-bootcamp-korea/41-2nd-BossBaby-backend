const { appDataSource } = require('./appDataSource');

const getSellerId = async (userId) => {
  const [sellerId] = await appDataSource.query(
    `
      SELECT
        id AS id
      FROM sellers
      WHERE user_id = ?
    `,
    [userId]
  );
  return sellerId;
};

const getSellerInfo = async (sellerId, userId) => {
  return await appDataSource.query(
    `
      SELECT
        u.nickname,
        u.description,
        u.profile_image,
        (
          SELECT
            count (id)
          FROM products
          WHERE seller_id = ?
        ) AS total_selling
      FROM users u
      WHERE u.id = ?
    `,
    [sellerId, userId]
  );
};

const getSellerReview = async (sellerId) => {
  return await appDataSource.query(
    `
      SELECT
        r.id,
        r.review_details,
        r.grade,
        u.nickname,
        JSON_ARRAYAGG(
          ri.img_url
        ) AS images
      FROM reviews r
      INNER JOIN 
        sellers s ON s.id = r.seller_id
      INNER JOIN 
        users u ON u.id = s.user_id
      LEFT JOIN
        review_images ri ON ri.review_id = r.id
      WHERE r.seller_id = ?
      GROUP BY r.id
  `,
    [sellerId]
  );
};

const getLikesList = async (userId) => {
  return await appDataSource.query(
    `
      SELECT
        p.id,
        p.title,
        p.price,
        ps.status,
        p.thumbnail_img
      FROM likes l
      INNER JOIN
        products p ON p.id = l.product_id
      INNER JOIN 
        product_status ps ON ps.id = p.product_status_id
      WHERE l.user_id = ?
    `,
    [userId]
  );
};

const getSellingProducts = async (sellerId) => {
  return await appDataSource.query(
    `
      SELECT
        p.id,
        p.title,
        p.price,
        ps.status,
        p.thumbnail_img
      FROM products p
      INNER JOIN 
        product_status ps ON ps.id = p.product_status_id
      WHERE p.seller_id = ?
    `,
    [sellerId]
  );
};

const getOrderProducts = async (userId) => {
  return await appDataSource.query(
    `
      SELECT
        p.id,
        p.title,
        p.price,
        ps.status,
        p.thumbnail_img
      FROM orders o
      INNER JOIN 
        products p ON p.id = o.product_id
      INNER JOIN 
        product_status ps ON ps.id = p.product_status_id
      WHERE o.user_id = ?
    `,
    [userId]
  );
};

module.exports = {
  getSellerId,
  getSellerInfo,
  getSellerReview,
  getLikesList,
  getSellingProducts,
  getOrderProducts,
};
