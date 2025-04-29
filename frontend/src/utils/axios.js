import axios from 'axios';

// Konfiguracja bazowego URL
axios.defaults.baseURL = process.env.NODE_ENV === 'production' 
  ? '/'  // w produkcji (kontener) używaj relatywnego URL
  : 'http://localhost:8080';  // w developmencie lokalnym

// Opcjonalnie: dodaj interceptory do logowania
axios.interceptors.request.use(
  (config) => {
    console.log('Axios Request:', config);
    return config;
  }, 
  (error) => {
    console.error('Axios Request Error:', error);
    return Promise.reject(error);
}
);

axios.interceptors.response.use(
  (response) => {
    console.log('Axios Response:', response);
    return response;
  },
  (error) => {
    console.error('Axios Response Error:', error);
    return Promise.reject(error);
  }
);

export default axios;
