import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://loopx-backend-vtnn.onrender.com/api',
  withCredentials: true,
});

export default axiosInstance;
