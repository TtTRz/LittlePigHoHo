import Taro from '@tarojs/taro';
import * as association from '../service/association'


export default {
  namespace: 'association',
  state: {
    list: [],
    entity: {},
    membersList: [],
    myEntity: {},
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
    *getAssociationEntityMe({ payload }, {call, put, select }) {
      const result = yield call(association.getAssociationEntity, {schoolId: payload.schoolId, associationId: payload.associationId });
      const { data } = result.data;
      const role = yield select(state => state.account.associations.filter((item) => item.association_id === payload.associationId))
      console.log(role);
      yield put({
        type: 'saveAssociationMe',
        payload: {
          ...data,
          role: role[0].role,
        },
      })
      return data;
    },
    *getAssociationListMe({ payload }, { call, put, select }) {
      // yield put({
      //   type: 'account/accountMe',
      //   payload: {token: Taro.getStorageSync('token')}
      // });
      const ids = yield select(state => state.account.associations);
      console.log(ids, '123123123')
      if(ids.length !==0 ){
        const assIds = ids.map((item) => {
          return item.association_id;
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
          type: 'saveAssociationList',
          payload: [
            ...myData,
          ]
        })
      }
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
    *delAssociationMembers({payload }, { call, put, select }) {
      const result = yield call(association.delAssociationMembers, payload);
      console.log(result);
    },
  },

  reducers: {
    saveAssociationMe(state, { payload }) {
      return {
        ...state,
        myEntity: payload,
      }
    },
    saveAssociation(state, { payload }) {
      return {
        ...state,
        entity: payload,
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
