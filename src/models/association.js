import Taro from '@tarojs/taro';
import * as association from '../service/association'


export default {
  namespace: 'association',
  state: {
    list: [],
    myList: [],
    entity: {},
    membersList: [],
    departmentList: [],
  },

  effects: {
    //获得协会列表
    *getAssociationList({ payload }, {call, put, select }) {
      const req = yield call(association.getAssociationList, payload);
      const { associations } = req.data;
      const ids = associations.map((item) => {
       return item.id;
      });
      const result = yield call(association.fetchAssociationEntities, { schoolId: payload.schoolId, ids: ids });
      const { data } = result.data;
      yield put({
        type: 'saveAssociationList',
        payload: data,
      })
    },
    *editAssociation({ payload }, { call, put, select }) {
      const result = yield call(association.editAssociation, payload);
      return result;
    },
    *delAssociation({ payload }, { call, put, select }) {
      const result = yield call(association.delAssociation, payload);
      return result
    },
    *addAssociation({ payload }, { call, put, select }) {
      const req = yield call(association.addAssociation, payload);
      const { data } = req;
      yield put({
        type: 'account/accountMe',
        payload: {token: Taro.getStorageSync('token')}
      });
      return data.status;
    },
    *fetchAssociationEntities({ payload }, {call, put, select }) {
      const req = yield call(association.fetchAssociationEntities, payload);
    },

    *getAssociationEntity({ payload }, {call, put, select }) {
      const result = yield call(association.getAssociationEntity, {schoolId: payload.schoolId, associationId: payload.associationId });
      const { data } = result.data;
      yield put({
        type: 'saveAssociation',
        payload: data,
      })
      return data;
    },
    *getAssociationListMe({ payload }, { call, put, select }) {
      yield put({
        type: 'account/accountMe',
        payload: {token: Taro.getStorageSync('token')}
      });
      const ids = yield select(state => state.account.associations);
      const assIds = ids.map((item) => {
        return  item.association_id;
      });
      const result = yield call(association.fetchAssociationEntities, { schoolId: payload.schoolId, ids: assIds });
      const { data } = result.data;
      const myData = data.map((item, index) => {
        return {
          ...item,
          role: ids[index].role,
        }
      });
      yield put({
        type: 'saveMyAssociationList',
        payload: [
          ...myData,
        ]
      })
    },
    *joinAssociation({ payload }, { call, put, select }) {
      const req = yield call(association.joinAssociationEntity, payload);
      const { data } = req;
      yield put({
        type: 'account/accountMe',
        payload: {token: Taro.getStorageSync('token')}
      });
      return data.status;
    },
    *getAssociationMembersList({ payload }, { call, put, select }) {
      const req = yield call(association.getAssociationMemberList, payload);
      const { accounts } = req.data;
      const ids = accounts.map((item) => {
        return item.id;
      });
      const result = yield call(association.getAssociationMemberEntities, {...payload, ids});
      console.log(result)
      const { data } = result.data;
      yield put({
        type: 'saveAssociationMembersList',
        payload: data,
      })
    },
    *addDepartment({ payload }, { call, put, select }) {
      const result = yield call(association.addDepartment, payload);
      return result;
    },
    *getDepartmentList({payload}, { call, put, select }) {
      const req = yield call(association.getDepartmentList, payload);
      const { departments } =req.data;
      const ids = departments.map((item) => {
        return item.id;
      });
      const result = yield call(association.getDepartmentEntities, { ...payload, ids });
      const { data } = result.data;
      yield put({
        type: 'saveDepartmentList',
        payload: data,
      })
    },
    *delAssociationMembers({payload }, { call, put, select }) {
      const result = yield call(association.delAssociationMembers, payload);
      console.log(result);
    }
  },

  reducers: {
    saveMyAssociationList(state, { payload }) {
      return {
        ...state,
        myList: [
          ...payload,
        ]
      }
    },
    saveAssociation(state, { payload }) {
      return {
        ...state,
        entity: payload,
      }
    },
    saveDepartmentList(state, { payload}) {
      return {
        ...state,
        departmentList: payload,
      }
    },
    saveAssociationMembersList(state, { payload }) {
      return {
        ...state,
        membersList: payload,
      }
    },
    saveAssociationList(state, { payload }) {
      return {
        ...state,
        list: [
          ...payload
        ],
      }
    }
  }
}
