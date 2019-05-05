import Taro from '@tarojs/taro';
import * as attendances from '../service/attendances'


export default {
  namespace: 'attendances',
  state: {
    list: [],
  },

  effects: {
    *getAttendancesList({ payload }, { call, put, select }) {
      const req = yield call(attendances.getAttendancesList, (payload));
      const { data } = req;
      const ids = data.attendances.map((item) => {
        return item.id;
      })
      yield put({
        type: 'fetchAttendancesEntities',
        payload: {
          ids,
          schoolId: payload.schoolId,
          associationId: payload.associationId,
        }
      })
    },
    *addAttendances({ payload }, { call, put, select }) {
      const req = yield call(attendances.addAttendances, payload);
      const { data } = req.data;
      console.log(data);
    },
    *signAttendances({ payload }, { call, put, select}) {
      const req = yield call(attendances.signAttendances, payload);
      const { data } = req.data;
      console.log(data);
    },
    *leaveAttendances({ payload }, { call, put, select }) {
      const req =yield call(attendances.leaveAttendances, payload);
      const { data } = req.data;
      console.log(data);
    },
    *fetchAttendancesEntities({ payload }, { call, put, select }) {
      const req = yield call(attendances.fetchAttendancesEntities, (payload));
      const { data } = req.data;
      yield put({
        type:'saveAttendancesList',
        payload: data,
      })
    },
  },
  reducers: {
    saveAttendancesList(state, { payload }) {
      return {
        ...state,
        list: payload,
      }
    }
  }
}
