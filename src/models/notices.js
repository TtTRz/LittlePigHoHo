import Taro from '@tarojs/taro';
import * as notice from '../service/notices'

export default {
  namespace: 'notices',
  state: {
    notices: {},
    assoNoticesList: [],
    entity: {},
  },
  effects: {
    *getNoticesList({ payload }, { call, put, select }) {
      const req = yield call(notice.getNoticesList, payload);
      const { data } = req;
      const { notices } = data;
      const ids = notices.map((item) => {
        return item.id;
      })
      yield put({
        type: 'fetchNoticesEntities',
        payload: {
          ids,
          schoolId: payload.schoolId,
          associationId: payload.associationId,
        }
      })
    },
    *addNotices({ payload }, { call, put, select }) {
      const req = yield call(notice.addNotices, payload);
      const { data } = req;
      console.log(data);
    },
    *fetchNoticesEntities({ payload }, { call, put, select }) {
      const req = yield call(notice.fetchNoticesEntities, payload);
      const { data } = req;
      console.log(data);
      yield put({
        type:'saveAssoNoticesList',
        payload: data.data,
      })
    },
    *getNoticeEntity({ payload }, {call, put, select }) {
      const req = yield call(notice.getNotice, payload);
      const { data } = req;
      yield put({
        type: 'saveNoticeEntity',
        payload: data.data,
      })
    },
    *delNotice({ payload }, { call, put, select }) {
      const req = yield call(notice.delNotice, payload);
      const { data } = req;

    }
  },
  reducers: {
    saveAssoNoticesList(state, { payload }) {
      return {
        ...state,
        assoNoticesList: payload,
      }
    },
    saveNoticeEntity(state, { payload }) {
      return {
        ...state,
        entity: payload,
      }
    }
  }
}
