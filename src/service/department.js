import PathToRegexp from 'path-to-regexp';
import {API} from "../constants/apis";
import Request from "../utils/request";

export const getDepartmentList = (payload ) => {
  const pattern = PathToRegexp.compile(API.ASSOCIATION.DEPARTMENT.LIST);
  return (
    Request({
      url: pattern({ sid: payload.schoolId, aid: payload.associationId}),
      method: 'get',
      params: {
        limit: 300,
        ...payload.query,
      }
    })
  )
};

export const getDepartmentEntities = (payload) => {
  const pattern = PathToRegexp.compile(API.ASSOCIATION.DEPARTMENT.MGET);
  return (
    Request({
      url: pattern({ sid: payload.schoolId, aid: payload.associationId}),
      method: 'post',
      data: {
        ids: payload.ids,
      }
    })
  )
}

export const addDepartment = (payload) => {
  const pattern = PathToRegexp.compile(API.ASSOCIATION.DEPARTMENT.ADD);
  return (
    Request({
      url: pattern({ sid: payload.schoolId, aid: payload.associationId}),
      method: 'post',
      data: {
        name: payload.name,
        short_name: payload.shortname,
        description: payload.description
      }
    })
  )
}

export const getDepartmentEntity = (payload) => {
  const pattern = PathToRegexp.compile(API.ASSOCIATION.DEPARTMENT.CURD);
  return (
    Request({
      url: pattern({ sid: payload.schoolId, aid: payload.associationId, did: payload.departmentId }),
      method: 'get',
    })
  )
}
