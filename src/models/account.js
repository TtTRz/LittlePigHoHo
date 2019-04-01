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
    *login(_, { call, put, select }) {

      const req = yield call(account.login);
      yield put({
        type: 'save',
        payload: {
          id: Taro.getStorageSync('accountId')
        }
      })
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
