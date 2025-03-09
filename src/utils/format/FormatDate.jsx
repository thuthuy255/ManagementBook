export const formatDate = (dateString) => {
  if (!dateString) return ''; // Kiểm tra giá trị null hoặc undefined
  const date = new Date(dateString);
  if (isNaN(date)) return ''; // Kiểm tra nếu date không hợp lệ

  const day = String(date.getDate()).padStart(2, '0'); // Lấy ngày và thêm số 0 nếu cần
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng tính từ 0 nên +1
  const year = date.getFullYear(); // Lấy năm

  return `${day}/${month}/${year}`;
};
