import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getEmployees = () => api.get('/employees/');
export const getEmployee = (id) => api.get(`/employees/${id}/`);
export const createEmployee = (data) => api.post('/employees/', data);
export const updateEmployee = (id, data) => api.put(`/employees/${id}/`, data);
export const deleteEmployee = (id) => api.delete(`/employees/${id}/`);