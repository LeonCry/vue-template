import type { ResponsePromise } from 'ky';
import ky from 'ky';
import { getLocalData } from './get-local-data';

interface Options {
  prefixUrl?: string
  noPrefixUrl?: boolean
  headers?: Record<string, string>
  timeout?: number
}
interface Response<T> {
  code: number
  data: T
  value: T
  msg: string
  [key: string]: any
}
class Request {
  private kyOptions: Omit<Options, 'headers'>;
  private headers: Record<string, string>;
  constructor(options?: Options) {
    this.kyOptions = {
      prefixUrl: options?.prefixUrl || import.meta.env.VITE_PREFIX_URL,
      timeout: options?.timeout,
    };
    this.headers = options?.headers || {};
  }

  private getRequestOptions() {
    interface Headers {
      Authorization: string
      environment: string
      tenant: string
      [x: string]: string
    }
    const headers: Headers = {
      Authorization: getLocalData('USER')?.token || '',
      environment: getLocalData('PROJECT')?.environment || '',
      tenant: getLocalData('PROJECT')?.tenant || '',
      ...this.headers,
    };
    return {
      ...this.kyOptions,
      headers,
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

  public async GET<T>(url: string, params?: Record<string, any>): Promise<Response<T>> {
    const urlWithParams = `${url}?${new URLSearchParams(params).toString()}`;
    const r = await this.catchProcess<T>(ky.get(urlWithParams, this.getRequestOptions()));
    return r;
  }

  public async POST<T>(url: string, data?: Record<string, any>): Promise<Response<T>> {
    const r = await this.catchProcess<T>(ky.post(url, { json: data, ...this.getRequestOptions() }));
    return r;
  }

  public async DOWNLOAD(url: string, fileName?: string, params?: Record<string, any>) {
    let name = fileName || '';
    const u = params ? `${url}?${new URLSearchParams(params).toString()}` : url;
    const o = this.getRequestOptions();
    o.headers.responseType = 'blob';
    const r = await this.catchProcess<Blob>(ky.get(u, o));
    const b = await r.blob();
    const h = r.headers;
    const contentDisposition = h.get('content-disposition') || '';
    if (typeof (contentDisposition) === 'string') {
      const entity = contentDisposition
        .split(';')
        .map(item => item.trim().split('='))
        .find(([key]) => key === 'filename');
      if (entity) name = decodeURIComponent(entity[1] || '');
    }
    const lh = URL.createObjectURL(b);
    const link = document.createElement('a');
    link.download = name;
    link.href = lh;
    link.click();
  }
}
const baseRequest = new Request();

export {
  baseRequest as request,
  Request,
};
