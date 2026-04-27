import api from './api';

export const personsService = {
  getAll: () => api.get('/persons'),
  getById: (id) => api.get(`/persons/${id}`),
  create: (data) => api.post('/persons', data),
};
