import PathToRegexp from 'path-to-regexp';
import Request from '../utils/request'
import { API } from '../constants/apis'

export const getNoticesList = (payload) => {
  const pattern = PathToRegexp.compile(API.NOTICES.LIST);
  return (
    Request({
      url: pattern({ sid: payload.schoolId, aid: payload.associationId }),
      method: 'get',
      params: {
        limit: 10000,

      }
    })
  )
}
