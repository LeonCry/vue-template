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
  (response: any) => {
    const { data } = response;
    if (data.code === 401) {
      ElMessage.info('登录过期,请重新登录');
      // user.logout();
    }
    else if (data.code === 200) {
      if (response.data.code === 500)
        return ElMessage.error(data.msg || `异常：${data.code}`);
      return response.data;
    }
    else if (data.code === 500) {
      ElMessage.error(data.msg || `异常：${data.code}`);
    }
    return response.data;
  },
  (error) => {
    const { response } = error;
    ElMessage.error(response?.data?.msg || error.message);
    return Promise.reject(error);
  },
);
export default request;
