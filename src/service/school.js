import PathToRegexp from 'path-to-regexp';
import Request from '../utils/request'
import { API } from '../constants/apis'


export const getSchoolList = (payload) => {
  return (
    Request({
      url: API.SCHOOL.LIST,
      method: 'get',
    })
  )
};

export const fetchSchoolEntities = (payload) => {
  return (
    Request({
      url: API.SCHOOL.MGET,
      method: 'post',
      data: payload,
    })
  )
}
