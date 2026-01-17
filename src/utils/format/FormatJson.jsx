export function formatJson(input) {
  try {
    if (typeof input !== 'string') return Array.isArray(input) ? input : [];
    const parsed = JSON.parse(input);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Lỗi parse JSON:', error);
    return [];
  }
}
