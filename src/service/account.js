import Taro from '@tarojs/taro';
import Request from '../utils/request'
import { API } from '../constants/apis'

export const login = (payload) => {
  Taro.login({
    success: res => {
      //发送res.code到后台换取openId，sessionKey， unionId
      Taro.getUserInfo({
        success: re => {
          Request({
            url: API.ACCOUNT.REGISTER,
            method: 'post',
            data: {
              token: res.code,
              nickname: re.userInfo.nickName,
              sex: re.userInfo.gender,
            },
          }).then(data => {
            Taro.setStorageSync('token', data.data.token);
            Taro.setStorageSync('accountId', data.data.id);
          })
        }
      })
    }
  })
};
