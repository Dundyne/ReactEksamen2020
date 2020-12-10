import http from './http';

export const createUser = async (credentials) => {
  try {
    return await http.post('/register', credentials);
  } catch (err) {
    return err.response;
  }
};

export default {
  createUser,
};
