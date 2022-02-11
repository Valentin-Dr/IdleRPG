import axios from 'axios';

const API = axios.create({ baseURL: 'https://api-idlerpg.herokuapp.com' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.authorization = `${JSON.parse(localStorage.getItem('profile'))}`;
  }
  return req;
});

export default API;
