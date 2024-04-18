import axios from 'axios';
import { ElMessage } from 'element-plus';
const request = axios.create({ baseURL: import.meta.env.VITE_PREFIX_URL });
// 请求拦截器
request.interceptors.request.use((config) => {
  const { headers } = config;
  headers.Authorization = localStorage.getItem('token');
  return config;
});
// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (data.code === 401) {
      console.log('token过期');
    } else if (data.code) {
      ElMessage.error(data.msg || `异常：${data.code}`);
    }
    return response;
  },
  (error) => {
    const { response } = error;
    ElMessage.error(response?.data?.msg || error.message);
    return Promise.reject(error);
  },
);
export default request;
