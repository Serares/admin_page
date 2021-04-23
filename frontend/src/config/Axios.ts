import axios from 'axios';
import { BACKEND_URL } from '../utils/environment';

const axiosConfig = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default axiosConfig;
