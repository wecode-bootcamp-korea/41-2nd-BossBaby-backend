const SortOption = Object.freeze({
  recent: 'ORDER BY p.created_at DESC',
  favorite: 'ORDER BY p.total_likes',
  price_asc: 'ORDER BY p.price',
  price_dsc: 'ORDER BY p.price DESC',
});

const SubCategoryId = Object.freeze({
  inner: 1,
  topbottom: 2,
  onepiece: 3,
  shoes: 4,
  accessory: 5,
  bedding: 6,
  toy: 7,
});

module.exports = {
  SortOption,
  SubCategoryId,
};
