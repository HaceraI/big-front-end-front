import HttpRequest from './axios';
import config from '@/config/index';
const baseUrl = process.env.NODE_ENV !== 'production' ? config.baseUrl.dev : config.baseUrl.pro;

const axios = new HttpRequest(baseUrl);

export default axios;