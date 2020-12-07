import http from './http';

const API_URL = '/register'
export const createUser = async (credentials) => {
    try {
      return await http.post('/register', credentials );
    } catch (err) {
      return err.response;
    }
  };

  export default {
    createUser
  };
  