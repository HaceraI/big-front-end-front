import axios from '@/utils/request';

/**
 * 获取图形验证码
 * @param sid   用户SessionId
 * @returns {AxiosPromise}
 */
const getCaptcha = (sid) => {
  return axios.get('/public/getCaptcha', {
    params: {
      sid: sid
    }
  });
}

/**
 * 忘记密码
 * @param option  忘记密码携带参数
 * @returns {AxiosPromise}
 */
const forget = (option) => {
  return axios.post('/user/forget', {
    ...option
  });
}

/**
 * 用户登录
 * @param sid   用户 SessionId
 * @param data  请求携带参数
 * @returns {AxiosPromise}
 */
const login = (sid, data) => {
  return axios.post(`/user/login?sid=${sid}`, {
    ...data
  });
}

/**
 * 用户注册
 * @param sid   用户 SessionId
 * @param data  请求携带参数
 * @returns {AxiosPromise}
 */
const reg = (sid, data) => {
  return axios.post(`/user/reg?sid=${sid}`, {
    ...data
  });
}

export {
  getCaptcha,
  forget,
  login,
  reg
}