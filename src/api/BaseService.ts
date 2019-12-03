import axios from './BaseAxios';
import {IServiceProxyOptions} from '@/interface/IServices/IBaseService';
import apiConfig from '@/config/api';
export default class BaseService<R> {
  post<T>(url: string = '', params: object = {}): Promise<R> {
    return axios.post(url, params);
  }
  get<T>(url: string = '', params: object = {}): Promise<R> {
    return axios.get<T, R>(url, {params});
  }
  del<T>(url: string = '', params: object = {}): Promise<R> {
    return axios.delete<T, R>(url, params);
  }
  put<T>(url: string = '', params: object = {}): Promise<R> {
    return axios.put<T, R>(url, params);
  }
  public createProxy<T>(options: IServiceProxyOptions) {
    const obj = this;
    return new Proxy(obj, {
      get(target: any, property: string) {
        return async (...args: any[]) => {
          const {basePath, requestMethodMap} = options;
          if (target[property] instanceof Function) { // 调用的是axios
            args[0] = `${apiConfig.prefix}/${basePath}/${args[0] || ''}`;
            return target[ property ] (...args);
          } else {
            let url = '';
            url = property.replace(/([A-Z])/g, '-$1').toLowerCase();
            let method = 'post';
            if (requestMethodMap) {
              method = requestMethodMap[property] || method;
            }
            if (target[method]) {
              const data = await target[method](`${apiConfig.prefix}/${basePath}/${url}`, ...args);
              return data;
            }
          }
        };
      },
    }) as T;
  }
}
export function createProxy<T, R>(options: IServiceProxyOptions) {
  const proxy = new BaseService();
  return proxy.createProxy(options) as T & BaseService<R>;
}
