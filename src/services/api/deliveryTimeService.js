/**
 * Delivery Time API Service
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function getDeliveryTimes(filters = {}) {
  try {
    const queryParams = new URLSearchParams();
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.is_active !== undefined) queryParams.append('is_active', filters.is_active);
    queryParams.append('page', (filters.page || 1).toString());
    queryParams.append('limit', (filters.limit || 12).toString());

    const response = await fetch(`${API_BASE_URL}/api/delivery-times?${queryParams}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching delivery times:', error);
    throw error;
  }
}

export async function createDeliveryTime(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/delivery-times`, {
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
    console.error('Error creating delivery time:', error);
    throw error;
  }
}

export async function updateDeliveryTime(id, data) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/delivery-times`, {
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
    console.error('Error updating delivery time:', error);
    throw error;
  }
}

export async function deleteDeliveryTime(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/delivery-times?id=${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting delivery time:', error);
    throw error;
  }
}

export async function bulkDeleteDeliveryTimes(ids) {
  try {
    const idsParam = ids.join(',');
    const response = await fetch(`${API_BASE_URL}/api/delivery-times?ids=${idsParam}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error bulk deleting delivery times:', error);
    throw error;
  }
}




