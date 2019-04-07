import Taro from '@tarojs/taro';
import * as school from '../service/school'

export default {
  namespace: 'school',
  state: {
    list: [],
  },
  effects: {
    *getSchoolList({ payload }, { call, put, select }) {
      const req = yield call(school.getSchoolList, payload);
      const { data } = req;
      const { schools } = data;
      const ids = schools.map((item) => {
        return item.id;
      });
      yield put({
        type: 'fetchSchoolEntities',
        payload: { ids },
      })
    },
    *fetchSchoolEntities({ payload }, { call, put, select }) {
      const req = yield call(school.fetchSchoolEntities, payload);
      const { data } = req.data;
      yield put({
        type: 'saveSchoolList',
        payload: [
          ...data,
        ]
      })
    }
  },

  reducers: {
    saveSchoolList(state, { payload }) {
      return {
        ...state,
        list: [
          ...payload,
        ]
      }
    },
  }
}
