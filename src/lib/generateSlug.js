/**
 * Reusable CRUD helper functions
 * Shared logic for Categories, Occasions, and Delivery Times
 */

/**
 * Build WHERE clause for search and filters
 * @param {Array} conditions - Array to push conditions to
 * @param {Array} params - Array to push parameters to
 * @param {number} paramIndex - Current parameter index
 * @param {string} search - Search term
 * @param {boolean} isActive - Filter by active status
 * @returns {number} Updated parameter index
 */
export function buildWhereClause(conditions, params, paramIndex, search, isActive) {
  if (search) {
    conditions.push(`LOWER(name) LIKE $${paramIndex}`);
    params.push(`%${search.toLowerCase()}%`);
    paramIndex++;
  }

  if (isActive !== undefined && isActive !== null) {
    conditions.push(`is_active = $${paramIndex}`);
    params.push(isActive);
    paramIndex++;
  }

  return paramIndex;
}

/**
 * Validate slug format
 * @param {string} slug - Slug to validate
 * @returns {boolean} True if valid
 */
export function isValidSlug(slug) {
  const slugRegex = /^[a-z0-9-_]+$/;
  return slugRegex.test(slug);
}

/**
 * Generate slug from name
 * @param {string} name - Name to convert to slug
 * @returns {string} Generated slug
 */
export function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Validate entity data
 * @param {Object} data - Entity data
 * @returns {Object} { valid: boolean, errors: Array }
 */
export function validateEntityData(data) {
  const errors = [];

  if (!data.name || data.name.trim().length === 0) {
    errors.push('Name is required');
  } else if (data.name.length > 255) {
    errors.push('Name must be 255 characters or less');
  }

  if (data.slug) {
    if (!isValidSlug(data.slug)) {
      errors.push('Slug must contain only lowercase letters, numbers, hyphens, and underscores');
    }
  }

  if (data.is_active !== undefined && typeof data.is_active !== 'boolean') {
    errors.push('is_active must be a boolean');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}




