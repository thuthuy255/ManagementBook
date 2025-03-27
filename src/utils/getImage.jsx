export const getImage = (product) => {
  if (product.img_src) {
    const images = JSON.parse(product.img_src);
    return images?.length ? images[0] : '';
  }
  return '';
};
