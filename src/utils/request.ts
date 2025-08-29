import type { ResponsePromise } from 'ky';
import ky from 'ky';

interface Options {
  prefixUrl?: string
  noPrefixUrl?: boolean
  headers?: Record<string, string>
}
interface Response<T> {
  code: number
  data: T
  value: T
  msg: string
  [key: string]: any
}
class Request {
  baseURL: string;
  headers: Record<string, string>;
  private kyOptions: Options;
  constructor(options?: Options) {
    this.baseURL = options?.prefixUrl || import.meta.env.VITE_PREFIX_URL;
    const defaultHeaders = { Authorization: localStorage.getItem('token') || '' };
    this.headers = { ...defaultHeaders, ...options?.headers };
    this.kyOptions = {
      prefixUrl: options?.noPrefixUrl ? undefined : this.baseURL,
      headers: this.headers,
    };
  }

  private async catchProcess<T>(cb: ResponsePromise): Promise<Response<T>> {
    const r: Awaited<ResponsePromise> = await cb.catch((err) => {
      ElMessage.error(err.message);
      return Promise.reject(err);
    });
    if (r.status === 500) {
      ElMessage.error(r.statusText || `异常：${r.status}`);
      return Promise.reject(r);
    }
    const res: Response<T> = await r.json();
    if (res.code === 500) {
      ElMessage.error(res.msg || `异常：${res.code}`);
      return Promise.reject(res);
    }
    return res;
  }

  async GET<T>(url: string, params?: Record<string, any>): Promise<Response<T>> {
    const urlWithParams = `${url}?${new URLSearchParams(params).toString()}`;
    const r = await this.catchProcess<T>(ky.get(urlWithParams, this.kyOptions));
    return r;
  }

  async POST<T>(url: string, data?: Record<string, any>): Promise<Response<T>> {
    const r = await this.catchProcess<T>(ky.post(url, { json: data, ...this.kyOptions }));
    return r;
  }
}

export default Request;
