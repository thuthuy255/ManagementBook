export const formatPrice = (price) => {
  if (isNaN(price)) {
    throw new Error('Invalid price value');
  }

  // Định dạng số với dấu phân cách hàng nghìn
  const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Thêm đơn vị tiền tệ "đ"
  return `${formattedPrice} đ`;
};
