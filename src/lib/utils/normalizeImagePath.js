/**
 * Normalizes an image path to work with Next.js Image component
 * Handles:
 * - Absolute URLs (http://, https://, //)
 * - Local paths with leading slash
 * - Relative local paths (converts to leading slash)
 * - Unsplash and external CDN URLs
 * @param {string} imagePath - The image path to normalize
 * @param {string} fallback - Fallback image if path is invalid (default: '/images/fallback.jpg')
 * @returns {string} - Normalized image path
 */
export function normalizeImagePath(imagePath, fallback = '/images/fallback.jpg') {
  // If no image path provided, return fallback
  if (!imagePath || typeof imagePath !== 'string') {
    return fallback;
  }

  const trimmedPath = imagePath.trim();

  // Already absolute URL (http, https, //)
  if (
    trimmedPath.startsWith('http://') ||
    trimmedPath.startsWith('https://') ||
    trimmedPath.startsWith('//')
  ) {
    return trimmedPath;
  }

  // Already has leading slash (local path)
  if (trimmedPath.startsWith('/')) {
    return trimmedPath;
  }

  // Relative local path - add leading slash
  // This handles cases like "mothers-day.jpg" → "/mothers-day.jpg"
  if (trimmedPath && !trimmedPath.includes('://')) {
    return `/${trimmedPath}`;
  }

  // Fallback to default image
  return fallback;
}

/**
 * Validates if an image path is safe for Next.js Image component
 * @param {string} imagePath - The image path to validate
 * @returns {boolean} - True if path is valid for Next.js Image
 */
export function isValidImagePath(imagePath) {
  if (!imagePath || typeof imagePath !== 'string') {
    return false;
  }

  const trimmedPath = imagePath.trim();

  return (
    trimmedPath.startsWith('/') ||
    trimmedPath.startsWith('http://') ||
    trimmedPath.startsWith('https://') ||
    trimmedPath.startsWith('//')
  );
}
