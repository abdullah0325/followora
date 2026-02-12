/**
 * Product API Service
 * Handles all API calls related to products
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Add a new product
 * @param {Object} productData - Product data to be added
 * @returns {Promise<Object>} Response from the API
 */
export async function addProduct(productData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
}

/**
 * Get products with filters and pagination
 * @param {Object} filters - Filter options
 * @param {string} filters.category - Category filter (cakes, flowers, gifts, decor)
 * @param {string} filters.gender - Gender filter (her, him, both)
 * @param {string} filters.delivery - Delivery filter (same-day, midnight)
 * @param {string} filters.occasion - Occasion filter (birthday, anniversary, etc.)
 * @param {string} filters.search - Search term for product name
 * @param {number} filters.minPrice - Minimum price filter
 * @param {number} filters.maxPrice - Maximum price filter
 * @param {number} filters.page - Page number (default: 1)
 * @param {number} filters.limit - Items per page (default: 12, max: 100)
 * @returns {Promise<Object>} Response with products and pagination info
 */
export async function getProducts(filters = {}) {
  try {
    // Build query string from filters
    const queryParams = new URLSearchParams();
    
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.gender) queryParams.append('gender', filters.gender);
    if (filters.delivery) queryParams.append('delivery', filters.delivery);
    if (filters.occasion) queryParams.append('occasion', filters.occasion);
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.minPrice !== undefined && filters.minPrice !== null) {
      queryParams.append('minPrice', filters.minPrice.toString());
    }
    if (filters.maxPrice !== undefined && filters.maxPrice !== null) {
      queryParams.append('maxPrice', filters.maxPrice.toString());
    }
    if (filters.colour) queryParams.append('colour', filters.colour);
    if (filters.premium !== undefined && filters.premium !== null) queryParams.append('premium', String(!!filters.premium));
    if (filters.sort) queryParams.append('sort', filters.sort);

    // Pagination (MANDATORY)
    queryParams.append('page', (filters.page || 1).toString());
    queryParams.append('limit', (filters.limit || 12).toString());

    const queryString = queryParams.toString();
    const url = `${API_BASE_URL}/api/products${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

/**
 * Get a single product by ID
 * @param {string|number} productId - Product ID
 * @returns {Promise<Object>} Product data
 */
export async function getProductById(productId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

export async function bulkAddProducts(products = []) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/bulk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ products }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error bulk adding products:', error);
    throw error;
  }
}

export async function bulkDeleteProducts(ids = []) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/bulk`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error bulk deleting products:', error);
    throw error;
  }
}

