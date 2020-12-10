import Axios from 'axios';

const http = Axios.create({
  baseURL: `${process.env.BASE_URL}${process.env.API_VERSION}`,
  // Skrudde av credentials for testing
  withCredentials: true,
});

export default http;
