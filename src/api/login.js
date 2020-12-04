import axios from '@/utils/request';

const getCaptcha = (sid) => {
  return axios.get('/getCaptcha', {
    params: {
      sid: sid
    }
  })
}

const forget = (option) => {
  return axios.post('/forget', {
    ...option
  })
}

export {
  getCaptcha,
  forget
}