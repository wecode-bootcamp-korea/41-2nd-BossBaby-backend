const { appDataSource } = require('./appDataSource');
const { SortOptionEnum, SubCategoryId } = require('../utils/enum');

const getSellerId = async (userId) => {
  return await appDataSource.query(
    `
      SELECT
        id as id
      FROM sellers
      WHERE user_id = ?
    `,
    [userId]
  );
};

const registerSeller = async (userId) => {
  await appDataSource.query(
    `
      INSERT INTO sellers (
        user_id
      ) VALUES ( ? )
    `,
    [userId]
  );
};

const postSellerProduct = async (title, images, price, description, region, exchangeable, subCategoryId, conditionId, userId, sellerId) => {
  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const imageArr = images.split(',');
    const postProducts = await queryRunner.query(
      `
        INSERT INTO products (
          title,
          price,
          description,
          region,
          exchangeable,
          thumbnail_img,
          total_likes,
          sub_category_id,
          condition_id,
          seller_id,
          product_status_id
        ) 
        VALUES ( ?, ?, ?, ?, ?, ?, 0, ?, ?, ?, 1)
      `,
      [title, price, description, region, parseInt(exchangeable), imageArr[0], parseInt(subCategoryId), parseInt(conditionId), sellerId]
    );
    let productId = postProducts.insertId;
    imageArr.map(async (img) => {
      await appDataSource.query(
        `
          INSERT INTO product_images (
            img_url,
            product_id
          ) VALUES ( ?, ? )
        `,
        [img, productId]
      );
    });
    await queryRunner.commitTransaction(console.log('transaction_commit'));
  } catch (err) {
    await queryRunner.rollbackTransaction(console.log('transaction_rollback'));
    throw new Error(err);
  } finally {
    await queryRunner.release(console.log('transaction_end'));
  }
};

const getProductList = async (subCategory, sort, offset, limit) => {
  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const [subCategoryId] = await queryRunner.query(
      `
        SELECT
          id
        FROM sub_categories
        WHERE sub_categories = ?
      `,
      [subCategory]
    );

    const productInfo = await queryRunner.query(
      `
        SELECT
          p.id,
          p.title,
          p.price,
          ps.status,
          p.thumbnail_img
        FROM products p
        INNER JOIN product_status ps ON ps.id = p.product_status_id
        WHERE p.sub_category_id = ? 
        ${SortOptionEnum[sort]}
        LIMIT ?, ?
      `,
      [subCategoryId.id, parseInt(offset), parseInt(limit)]
    );
    await queryRunner.commitTransaction(console.log('transaction_commit'));
    return productInfo;
  } catch (err) {
    await queryRunner.rollbackTransaction(console.log('transaction_rollback'));
    throw new Error(err);
  } finally {
    await queryRunner.release(console.log('transaction_end'));
  }
};

const countProductList = async (subCategoryId) => {
  const countList = await appDataSource.query(
    `
        SELECT
          count (*) AS total
        FROM products
        WHERE sub_category_id = ${SubCategoryId[subCategoryId]}
      `
  );
  return countList;
};

const getProductDetailByUserId = async (productId, exist) => {
  const productInfo = await appDataSource.query(
    `
      SELECT
        p.id,
        p.title,
        p.price,
        p.description,
        p.region,
        p.views,
        p.exchangeable,
        p.seller_id,
        p.total_likes,
        sc.sub_categories,
        ps.status,
        c.conditions,
        ${exist} AS likeOrNot,
        p.created_at,
        JSON_ARRAYAGG(
          pi.img_url
        ) AS images
      FROM products p
      INNER JOIN 
          product_images pi ON pi.product_id = p.id
      INNER JOIN 
          product_status ps ON ps.id = p.product_status_id
      INNER JOIN 
          conditions c ON c.id = p.condition_id
      INNER JOIN 
          sub_categories sc ON sc.id = p.sub_category_id
      WHERE p.id = ?
    `,
    [productId]
  );
  return productInfo;
};

const getSellerInfo = async (productId) => {
  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const [userId] = await appDataSource.query(
      `
        SELECT
          s.user_id as userId
        FROM products p
        INNER JOIN sellers s ON s.id = p.seller_id
        WHERE p.id = ?
      `,
      [productId]
    );

    const sellerInfo = await appDataSource.query(
      `
        SELECT
          id,
          profile_image,
          nickname,
          description
        FROM users 
        WHERE id = ?
      `,
      [userId.userId]
    );
    await queryRunner.commitTransaction(console.log('transaction_commit'));
    return sellerInfo;
  } catch (err) {
    await queryRunner.rollbackTransaction(console.log('transaction_rollback'));
    throw new Error(err);
  } finally {
    await queryRunner.release(console.log('transaction_end'));
  }
};

const getSellerReview = async (productId) => {
  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const [sellerId] = await appDataSource.query(
      `
        SELECT 
          seller_id AS id
        FROM products
        WHERE id = ?
      `,
      [productId]
    );

    const sellerReview = await appDataSource.query(
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
      [sellerId.id]
    );
    await queryRunner.commitTransaction(console.log('transaction_commit'));
    return sellerReview;
  } catch (err) {
    await queryRunner.rollbackTransaction(console.log('transaction_rollback'));
    throw new Error(err);
  } finally {
    await queryRunner.release(console.log('transaction_end'));
  }
};

const getLikesId = async (productId, userId) => {
  return await appDataSource.query(
    `
      SELECT 
        id
      FROM likes 
      WHERE product_id = ? AND user_id = ?
    `,
    [productId, userId]
  );
};

const addProductLikes = async (productId, userId) => {
  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    await appDataSource.query(
      `
        INSERT IGNORE INTO likes (
          product_id,
          user_id
        ) VALUES ( ?, ? )
      `,
      [productId, userId]
    );

    const [countLikes] = await appDataSource.query(
      `
        SELECT
          count (*) AS likes
        FROM likes
        WHERE product_id = ?
      `,
      [productId]
    );

    const updateProductLikes = await appDataSource.query(
      `
        UPDATE
          products
        SET total_likes = ?
        WHERE id = ?
      `,
      [countLikes.likes, productId]
    );
    await queryRunner.commitTransaction(console.log('transaction_commit'));
    return countLikes;
  } catch (err) {
    await queryRunner.rollbackTransaction(console.log('transaction_rollback'));
    throw new Error(err);
  } finally {
    await queryRunner.release(console.log('transaction_end'));
  }
};

const subtractProductLikes = async (productId, userId) => {
  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    await appDataSource.query(
      `
        DELETE
        FROM likes
        WHERE product_id = ?
          AND user_id = ?
      `,
      [productId, userId]
    );

    const [countLikes] = await appDataSource.query(
      `
        SELECT
          count (*) AS likes
        FROM likes
        WHERE product_id = ?
      `,
      [productId]
    );

    const updateProductLikes = await appDataSource.query(
      `
        UPDATE
          products
        SET total_likes = ?
        WHERE id = ?
      `,
      [countLikes.likes, productId]
    );

    await queryRunner.commitTransaction(console.log('transaction_commit'));
    return countLikes;
  } catch (err) {
    await queryRunner.rollbackTransaction(console.log('transaction_rollback'));
    throw new Error(err);
  } finally {
    await queryRunner.release(console.log('transaction_end'));
  }
};

const updateProductViews = async (productId) => {
  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const [getViews] = await appDataSource.query(
      `
        SELECT
          views
        FROM products
        WHERE id = ?
      `,
      [productId]
    );

    await appDataSource.query(
      `
        UPDATE
          products
        SET views = ?
        WHERE id = ?
      `,
      [parseInt(getViews.views + 1), productId]
    );
    await queryRunner.commitTransaction(console.log('transaction_commit'));
  } catch (err) {
    await queryRunner.rollbackTransaction(console.log('transaction_rollback'));
    throw new Error(err);
  } finally {
    await queryRunner.release(console.log('transaction_end'));
  }
};

const getRecommendList = async (offset, limit) => {
  const recommendProducts = await appDataSource.query(
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
      GROUP BY
        p.id
      ORDER BY p.total_likes DESC
      LIMIT ?, ?
    `,
    [offset, limit]
  );
  return recommendProducts;
};

const getRecentList = async (offset, limit) => {
  const recentProducts = await appDataSource.query(
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
      GROUP BY
        p.id
      ORDER BY p.created_at DESC
      LIMIT ?, ?
    `,
    [offset, limit]
  );
  return recentProducts;
};

const searchProductList = async (subCategory, sort, offset, limit, search) => {
  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    let searchList = '%' + search + '%';
    const [subCategoryId] = await appDataSource.query(
      `
        SELECT
          id
        FROM sub_categories
        WHERE sub_categories = ?
      `,
      [subCategory]
    );
    const searchProduct = await appDataSource.query(
      `
        SELECT
          p.id,
          p.title,
          p.price,
          ps.status,
          p.thumbnail_img
        FROM products p
        INNER JOIN product_status ps ON ps.id = p.product_status_id
        WHERE p.sub_category_id = ? AND title LIKE ?
        ${SortOptionEnum[sort]}
        LIMIT ?, ?
      `,
      [subCategoryId.id, searchList, parseInt(offset), parseInt(limit)]
    );
    await queryRunner.commitTransaction(console.log('transaction_commit'));
    return searchProduct;
  } catch (err) {
    await queryRunner.rollbackTransaction(console.log('transaction_rollback'));
    throw new Error(err);
  } finally {
    await queryRunner.release(console.log('transaction_end'));
  }
};

module.exports = {
  getSellerId,
  registerSeller,
  postSellerProduct,
  getProductList,
  countProductList,
  getProductDetailByUserId,
  getSellerInfo,
  getSellerReview,
  getLikesId,
  addProductLikes,
  subtractProductLikes,
  updateProductViews,
  getRecommendList,
  getRecentList,
  searchProductList,
};
