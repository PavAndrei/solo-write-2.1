export const getOptimizedImageUrl = (
  url: string,
  quality: number = 60
): string => {
  try {
    const parts = url.split('/upload/');
    if (parts.length !== 2) return url;

    return `${parts[0]}/upload/q_${quality}/${parts[1]}`;
  } catch (err) {
    console.error('Error optimizing Cloudinary URL:', err);
    return url;
  }
};
