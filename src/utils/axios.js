import axios from 'axios';
import errorHandler from './errorHandler';

class HttpRequest {
  constructor(baseUrl) { 
    this.baseUrl = baseUrl;
  }
  /**
    获取axios 的配置
   */
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    };
    return config;
  }
  /**
    设置拦截器
   */
  interceptors(instance) {
    // Add a request interceptor
    instance.interceptors.request.use((config) => {
      // Do something before request is sent
      return config;
    }, (error) => {
      // Do something with request error
      errorHandler(error);
      return Promise.reject(error);
    });

    // Add a response interceptor
    instance.interceptors.response.use((response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      if (response.status === 200) {
        return Promise.resolve(response.data);
      } else {
        return Promise.reject(response);
      }
    }, (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      errorHandler(error);
      return Promise.reject(error);
    });
  }
  /**
    创建axios实例
   */
  request(options) {
    const instance = axios.create();
    let newOptions = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance);
    return instance(newOptions);
  }
  /**
    封装 GET 请求
   */
  get(url, config) {
    const options = Object.assign({
      method: 'get',
      url: url
    }, config);
    return this.request(options);
  }
  /**
    封装 POST 请求
   */
  post(url, data) {
    return this.request({
      method: 'post',
      url: url,
      data: data
    });
  }
}

export default HttpRequest;