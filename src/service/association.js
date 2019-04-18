import PathToRegexp from 'path-to-regexp';
import Request from '../utils/request'
import { API } from '../constants/apis'

export const getAssociationList = (payload) => {
  const pattern = PathToRegexp.compile(API.ASSOCIATION.LIST);
  return (
    Request({
      url: pattern({ sid: payload.schoolId }),
      method: 'get',
      params: {
        limit: 300,
        key: payload.searchKey,
      }
    })
  )
};

export const addAssociation = (payload) => {
  const pattern = PathToRegexp.compile(API.ASSOCIATION.ADD);
  return (
    Request({
      url: pattern({ sid: payload.schoolId }),
      method: 'post',
      data: payload,
    })
  )
};

export const fetchAssociationEntities = (payload) => {
  const pattern = PathToRegexp.compile(API.ASSOCIATION.MGET);
  return (
    Request({
      url: pattern({ sid: payload.schoolId }),
      method: 'post',
      data: { ids: payload.ids },
    })
  )
}


export const getAssociationEntity = (payload) => {
  const pattern = PathToRegexp.compile(API.ASSOCIATION.CURD);
  return (
    Request({
      url: pattern({ sid: payload.schoolId, aid: payload.associationId }),
      method: 'get',
    })
  )
};

export const joinAssociationEntity = (payload) => {
  const pattern = PathToRegexp.compile(API.ASSOCIATION.JOIN);
  return (
    Request({
      url: pattern({ sid: payload.schoolId, aid: payload.associationId }),
      method: 'post',
      data: {
        choosing_code: payload.choosing_code,
      }
    })
  )
};

export const getAssociationMemberEntities = (payload) => {
  const pattern = PathToRegexp.compile(API.ASSOCIATION.MEMBERS.MGET);
  return (
    Request({
      url: pattern({ sid: payload.schoolId, aid: payload.associationId }),
      method: 'post',
      data: {
        ids: payload.ids,
      }
    })
  )
};

export const getAssociationMemberList = (payload) => {
  const pattern = PathToRegexp.compile(API.ASSOCIATION.MEMBERS.LIST);
  return (
    Request({
      url: pattern({ sid : payload.schoolId, aid: payload.associationId }),
      method: 'get',
      params: {
        limit: 300,
        ...payload.query,
      }
    })
  )
};


export const editAssociation = (payload) => {
  const pattern = PathToRegexp.compile(API.ASSOCIATION.CURD);
  return (
    Request({
      url: pattern({ sid: payload.schoolId, aid: payload.associationId }),
      method: 'put',
      data: {
        name: payload.name,
        short_name: payload.shortname,
        description: payload.description
      }
    })
  )
}
export const delAssociation = (payload) => {
  const pattern = PathToRegexp.compile(API.ASSOCIATION.CURD);
  return (
    Request({
      url: pattern({ sid: payload.schoolId, aid: payload.associationId }),
      method: 'delete',
    })
  )
}

export const delAssociationMembers = (payload) => {
  const pattern = PathToRegexp.compile(API.ASSOCIATION.MEMBERS.CURD);
  return (
    Request({
      url: pattern({ sid: payload.schoolId, aid: payload.associationId, acid: payload.accountId }),
      method: 'delete',
    })
  )
}
