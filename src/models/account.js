import Taro from '@tarojs/taro';
import * as account from '../service/account'

export default {
  namespace: 'account',
  state: {
    id: '',
  },

  effects: {
    //put 用于触发action
    //call 用于调用异步逻辑
    //select 用于从state里获取数据

    //登录
    *login({ payload }, { call, put, select }) {
      //调用微信login接口
      const req = yield call(account.login, payload);
      //将登录id刷入store
      yield put({
        type: 'save',
        payload: {
          id: req.data.data.id,
          token: req.data.data.token,
          association_id: req.data.association_id,
        }
      });
      Taro.setStorageSync('token', req.data.data.token);
      yield put({
        type: 'accountMe',
        payload: { token: req.data.data.token },
      });
    },
    //修改个人信息
    *editAccount({ payload }, { call, put, select }) {
      const req = yield call(account.editAccount, payload);
      const { data } = req;

      yield put({
        type: 'accountMe',
        payload: {token: Taro.getStorageSync('token')}
      });
      return data;
    },
    //发起登录者信息查询
    *accountMe({ payload }, {call ,put, select }) {
      const req = yield call(account.accountMe, payload);
      const { data } = req;

      yield put({
        type: 'save',
        payload: {
          ...data.data,
        }
      })
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload, avator: Taro.getStorageSync('avator')};
    },
  },
};
