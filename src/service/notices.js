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
};
export const fetchNoticesEntities = (payload) => {
  const pattern = PathToRegexp.compile(API.NOTICES.MGET);
  return (
    Request({
      url: pattern({ sid: payload.schoolId, aid: payload.associationId }),
      method: 'post',
      data: {
        ids: payload.ids,
      }
    })
  )
}
export const addNotices = (payload) => {
  const pattern = PathToRegexp.compile(API.NOTICES.ADD);
  return (
    Request({
      url: pattern({ sid: payload.schoolId, aid: payload.associationId }),
      method: 'post',
      data: {
        title: payload.title,
        content: payload.content,
        start_time: payload.start_time,
        end_time: payload.end_time,
      }
    })
  )
}

export const getNotice = (payload) => {
  const pattern = PathToRegexp.compile(API.NOTICES.CURD);
  return (
    Request({
      url: pattern({ sid: payload.schoolId, aid: payload.associationId, nid: payload.noticeId }),
      method: 'get',
    })
  )
}

export const delNotice = (payload) => {
  const pattern = PathToRegexp.compile(API.NOTICES.CURD);
  return (
    Request({
      url: pattern({ sid: payload.schoolId, aid: payload.associationId, nid: payload.noticeId }),
      method: 'delete',
    })
  )
}
