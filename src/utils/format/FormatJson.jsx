export function formatJson(input) {
  try {
    const parsed = JSON.parse(input);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Lỗi parse JSON:', error);
    return [];
  }
}
