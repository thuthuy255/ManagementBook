export async function convertImageUrlsToFiles(imageUrls) {
  if (!imageUrls) return [];

  const urls = Array.isArray(imageUrls) ? imageUrls : [imageUrls];

  const filePromises = urls.map(async (url, index) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const fileName = `image_${index + 1}.${blob.type.split('/')[1] || 'jpg'}`; // Đặt tên file dựa trên index
      console.log('File trả ra', fileName);
      return new File([blob], fileName, { type: blob.type });
    } catch (error) {
      console.error(`Lỗi tải ảnh từ URL: ${url}`, error);
      return null;
    }
  });

  const files = await Promise.all(filePromises);
  return files.filter(Boolean); // Lọc bỏ phần tử null nếu có lỗi tải ảnh
}

export async function convertUrlsToFiles(imageUrls) {
  try {
    if (!imageUrls) return [];

    // Nếu `imageUrls` là string JSON, parse về array
    if (typeof imageUrls === 'string') {
      try {
        imageUrls = JSON.parse(imageUrls);
      } catch (error) {
        console.error('❌ Lỗi parse JSON:', error);
        return [];
      }
    }

    // Đảm bảo đầu vào là mảng
    const urls = Array.isArray(imageUrls) ? imageUrls : [imageUrls];

    // Fetch từng ảnh và chuyển thành File object
    const filePromises = urls.map(async (url, index) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const blob = await response.blob();
        const fileName = `image_${index + 1}.${blob.type.split('/')[1] || 'jpg'}`;

        return new File([blob], fileName, { type: blob.type });
      } catch (error) {
        console.error(`❌ Lỗi tải ảnh từ URL: ${url}`, error);
        return null;
      }
    });

    const files = await Promise.all(filePromises);
    return files.filter(Boolean); // Lọc bỏ phần tử null nếu có lỗi tải ảnh
  } catch (error) {
    console.error('❌ Lỗi trong convertImageUrlsToFiles:', error);
    return [];
  }
}
