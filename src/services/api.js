import axios from 'axios';


const BASE_URL = 'https://revisit-category-management-backend-xcpj.onrender.com';

const API = axios.create({
  baseURL: BASE_URL,
  
});

export default API;
