/**
 * Occasion API Service
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function getOccasions(filters = {}) {
  try {
    const queryParams = new URLSearchParams();
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.is_active !== undefined) queryParams.append('is_active', filters.is_active);
    queryParams.append('page', (filters.page || 1).toString());
    queryParams.append('limit', (filters.limit || 12).toString());

    const response = await fetch(`${API_BASE_URL}/api/occasions?${queryParams}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching occasions:', error);
    throw error;
  }
}

export async function createOccasion(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/occasions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating occasion:', error);
    throw error;
  }
}

export async function updateOccasion(id, data) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/occasions`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...data }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating occasion:', error);
    throw error;
  }
}

export async function deleteOccasion(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/occasions?id=${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting occasion:', error);
    throw error;
  }
}

export async function bulkDeleteOccasions(ids) {
  try {
    const idsParam = ids.join(',');
    const response = await fetch(`${API_BASE_URL}/api/occasions?ids=${idsParam}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error bulk deleting occasions:', error);
    throw error;
  }
}




