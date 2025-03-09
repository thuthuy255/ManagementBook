export async function convertImageUrlsToFiles(imageUrls) {
  if (!imageUrls) return [];

  const urls = Array.isArray(imageUrls) ? imageUrls : [imageUrls];

  const filePromises = urls.map(async (url, index) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const fileName = `image_${index + 1}.${blob.type.split('/')[1] || 'jpg'}`; // Đặt tên file dựa trên index
      return new File([blob], fileName, { type: blob.type });
    } catch (error) {
      console.error(`Lỗi tải ảnh từ URL: ${url}`, error);
      return null;
    }
  });

  const files = await Promise.all(filePromises);
  return files.filter(Boolean); // Lọc bỏ phần tử null nếu có lỗi tải ảnh
}
