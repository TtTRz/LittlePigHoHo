import Taro from '@tarojs/taro';
import * as notices from '../service/notices'

export default {
  namespace: 'notices',
  state: {
    notices: {},
    assoNoticesList: [],
  },
  effects: {
    *getNoticesList({ payload }, { call, put, select }) {
      const req = yield call(notices.getNoticesList, payload);
      const { data } = req;
      console.log(data);
    },
    *addNotices({ payload }, { call, put, select }) {
      const req = yield call(notices.addNotices, payload);
      const { data } = req;
      console.log(data);
    }
  },
  reducers: {
    saveAssoNoticesList(state, { payload }) {
      return {
        ...state,
        assoNoticesList: payload,
      }
    }
  }
}
