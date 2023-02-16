const SortOptionEnum = Object.freeze({
  RECENT: 'ORDER BY p.created_at DESC',
  FAVORITE: 'ORDER BY p.total_likes',
  PRICE_ASC: 'ORDER BY p.price',
  PRICE_DSC: 'ORDER BY p.price DESC',
});

const SubCategoryId = Object.freeze({
  INNER: 1,
  TOP_BOTTOM: 2,
  ONE_PIECE: 3,
  SHOES: 4,
  ACCESSORY: 5,
  BEDDING: 6,
  TOY: 7,
});

const ProductStatusEnum = Object.freeze({
  selling: 1,
  pending: 2,
  soldout: 3,
});

module.exports = {
  SortOptionEnum,
  SubCategoryId,
  ProductStatusEnum,
};
