import Taro from '@tarojs/taro';
import * as department from '../service/department'

export default {
  namespace: 'department',
  state: {
    entity: {},
    list: [],
  },

  effects: {

    //获取部门列表信息
    *getDepartmentList({payload}, { call, put, select }) {
      const req = yield call(department.getDepartmentList, payload);
      const { departments } =req.data;
      const ids = departments.map((item) => {
        return item.id;
      });
      const result = yield call(department.getDepartmentEntities, { ...payload, ids });
      const { data } = result.data;
      yield put({
        type: 'saveDepartmentList',
        payload: data,
      })
    },

    //新增部门
    *addDepartment({ payload }, { call, put, select }) {
      const result = yield call(department.addDepartment, payload);
      return result;
    },
    *getDepartmentEntity({payload}, { call, put, select }) {
      const req = yield call(department.getDepartmentEntity, payload);
      const { data } = req.data;
      yield put({
        type: 'saveDepartmentEntity',
        payload: data,
      })
    }
  },

  reducers: {
    saveDepartmentEntity(state, { payload }) {
      return {
        ...state,
        entity: payload,
      }
    },
    saveDepartmentList(state, { payload}) {
      return {
        ...state,
        list: payload,
      }
    },
  }
}
