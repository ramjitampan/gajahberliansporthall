const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('access_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const json = await response.json().catch(() => null);

  if (!response.ok) {
    const message = json?.message || `Request failed with status ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.code = json?.code;
    throw error;
  }

  return json?.data !== undefined ? json.data : json;
}

export const apiClient = {
  // Venues & Courts
  async getVenues() {
    return request('/venues');
  },

  async getCourts(venueId) {
    const query = venueId ? `?venueId=${encodeURIComponent(venueId)}` : '';
    return request(`/courts${query}`);
  },

  // Availability
  async getAvailability(courtId, date, duration = 1) {
    const query = `?courtId=${encodeURIComponent(courtId)}&date=${encodeURIComponent(date)}&duration=${encodeURIComponent(duration)}`;
    return request(`/availability${query}`);
  },

  // Bookings
  async createBooking(bookingData) {
    return request('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },

  async getBooking(bookingCode) {
    return request(`/bookings/${encodeURIComponent(bookingCode)}`);
  },

  async getMyBookings() {
    return request('/me/bookings');
  },

  async cancelBooking(bookingCode, reason) {
    return request(`/bookings/${encodeURIComponent(bookingCode)}/cancel`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  },

  // Payments
  async createPaymentSession(bookingCode) {
    return request(`/bookings/${encodeURIComponent(bookingCode)}/payment`, {
      method: 'POST',
    });
  },

  async getPaymentStatus(paymentCode) {
    return request(`/payments/${encodeURIComponent(paymentCode)}/status`);
  },

  // Authentication
  async register(data) {
    const result = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (result?.tokens?.accessToken) {
      localStorage.setItem('access_token', result.tokens.accessToken);
      localStorage.setItem('refresh_token', result.tokens.refreshToken);
    }
    return result;
  },

  async login(email, password) {
    const result = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (result?.tokens?.accessToken) {
      localStorage.setItem('access_token', result.tokens.accessToken);
      localStorage.setItem('refresh_token', result.tokens.refreshToken);
    }
    return result;
  },

  async getMe() {
    return request('/auth/me');
  },

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
};
