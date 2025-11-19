import apiClient from './client.js';

export const signup = async (email, password, full_name = '', phone = '') => {
  const response = await apiClient.post('/auth/signup', {
    email,
    password,
    full_name,
    phone
  });
  
  // Store token and user
  if (response.data.token) {
    localStorage.setItem('auth_token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  
  return response.data;
};

export const login = async (email, password) => {
  const response = await apiClient.post('/auth/login', {
    email,
    password
  });
  
  // Store token and user
  if (response.data.token) {
    localStorage.setItem('auth_token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
};

export const getCurrentUser = async () => {
  const response = await apiClient.get('/auth/me');
  return response.data.user;
};

export const updateUser = async (full_name, phone) => {
  const response = await apiClient.put('/auth/me', {
    full_name,
    phone
  });
  
  // Update stored user
  if (response.data.user) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  
  return response.data.user;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('auth_token');
};

export const getStoredUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

