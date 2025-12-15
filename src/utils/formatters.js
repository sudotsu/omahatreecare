// Shared formatting utilities

/**
 * Formats a kebab-case slug (e.g., "elkhorn-ne") into a Title Case string (e.g., "Elkhorn Ne").
 * @param {string} city - The city slug to format.
 * @returns {string} - The formatted city name.
 */
export const formatCityName = (city) => {
  if (!city) return '';
  return city.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};