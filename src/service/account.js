import Taro from '@tarojs/taro';
import Request from '../utils/request'
import { API } from '../constants/apis'

export const login = (payload) =>
  Request({
    url: API.ACCOUNT.REGISTER,
    method: 'post',
    data: {
      token: payload.token,
      nickname: payload. nickname,
      sex: payload.sex,
    },
  })

export const accountMe = (payload) => (
  Request({
    url: API.ACCOUNT.ME,
    method: 'get',
    header: payload.token
  })
);

