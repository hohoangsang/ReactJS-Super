import axios, { AxiosInstance } from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:5000',
//   timeout: 10000
// });

// api.interceptors.request.use((config) => {
//   return config;
// });

// api.interceptors.response.use((response) => {
//   return response;
// });

// export default api;

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:5000',
      timeout: 10000
    });
  }
}

const api = new Http().instance;

export default api;
