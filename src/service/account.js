import PathToRegexp from 'path-to-regexp';
import Request from '../utils/request'
import { API } from '../constants/apis'

export const login = (payload) =>
  Request({
    url: API.ACCOUNT.REGISTER,
    method: 'post',
    data: {
      token: payload.token,
      nickname: payload. nickname,
      sex: payload.sex,
    },
  })

export const accountMe = (payload) => (
  Request({
    url: API.ACCOUNT.ME,
    method: 'get',
    header: payload.token
  })
);

export const editAccount = (payload) => {
  const pattern = PathToRegexp.compile(API.ACCOUNT.CURD);
  return Request({
    url: pattern({ aid: payload.accountId }),
    method: 'put',
    data: payload,
  })
}

export const changeSchool = (payload) => {
  return Request({
    url: API.ACCOUNT.CHANGE_SCHOOL,
    method: 'get',
    params: {
      school_id: payload.schoolId
    }
  })
};

export const getDashboard = (payload) => {
  return Request({
    url: API.ACCOUNT.DASHBOARD,
    method: 'get',
  })
}
