export const getImage = (product) => {
  if (product.img_src) {
    const images = typeof product.img_src === 'string'
      ? JSON.parse(product.img_src)
      : product.img_src;
    return images?.length ? images[0] : '';
  }
  return '';
};
