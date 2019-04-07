import PathToRegexp from 'path-to-regexp';
import Request from '../utils/request'
import { API } from '../constants/apis'

export const getAssociationList = (payload) => {
  const pattern = PathToRegexp.compile(API.ASSOCIATION.LIST);
  return (
    Request({
      url: pattern({ sid: payload.schoolId }),
      method: 'get',
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
