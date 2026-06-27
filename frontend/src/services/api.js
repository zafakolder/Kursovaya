import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem('refresh');
      if (refresh) {
        try {
          const { data } = await axios.post('http://localhost:8000/api/auth/token/refresh/', {
            refresh,
          });
          localStorage.setItem('access', data.access);
          originalRequest.headers.Authorization = `Bearer ${data.access}`;
          return api(originalRequest);
        } catch (refreshError) {
          localStorage.clear();
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;

export const cartApi = {
  get: () => api.get('cart/'),
  add: (productId, quantity = 1) => api.post('cart/add/', { product_id: productId, quantity }),
  remove: (productId) => api.post('cart/remove/', { product_id: productId }),
  clear: () => api.delete('cart/clear/'),
  checkout: (address) => api.post('cart/checkout/', { address }),
};

export const ordersApi = {
  list: () => api.get('orders/'),
};