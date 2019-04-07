import Taro from '@tarojs/taro';
import * as association from '../service/association'


export default {
  namespace: 'association',
  state: {
    list: [],
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
      return data.id;
    }
  },

  reducers: {
    saveAssociationList(state, { payload }) {
      return {
        ...state,
        list: {
          ...state.list,
          ...payload,
        }
      }
    }
  }
}
