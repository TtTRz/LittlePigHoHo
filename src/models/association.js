import Taro from '@tarojs/taro';
import * as association from '../service/association'


export default {
  namespace: 'association',
  state: {
    list: [],
    myList: [],
  },

  effects: {
    //获得协会列表
    *getAssociationList({ payload }, {call, put, select }) {
      const req = yield call(association.getAssociationList, payload);
      console.log(req);
    },
    *addAssociation({ payload }, { call, put, select }) {
      const req = yield call(association.addAssociation, payload);
      const { data } = req;
      yield put({
        type: 'account/accountMe',
        payload: {token: Taro.getStorageSync('token')}
      });
      return data.id;
    },
    *fetchAssociationEntities({ payload }, {call, put, select }) {
      const req = yield call(association.fetchAssociationEntities, payload);
    },

    *getAssociationListMe({ payload }, { call, put, select }) {
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
    saveAssociationList(state, { payload }) {
      return {
        ...state,
        list: {
          ...payload,
        }
      }
    }
  }
}
