import PathToRegexp from 'path-to-regexp';
import Request from '../utils/request'
import { API } from '../constants/apis'

export const addAttendances = (payload) => {
  const pattern = PathToRegexp.compile(API.ASSOCIATION.ATTENDANCES.ADD);
  return Request({
    url: pattern({ sid: payload.schoolId, aid: payload.associationId}),
    method: 'post',
    data: {
      title: payload.title,
      description: payload.description,
      place_x: payload.place_x,
      place_y: payload.place_y,
      distance: payload.distance,
      start_time: payload.start_time,
      end_time: payload.end_time,
    }
  })
}

export const getAttendancesList = (payload) => {
  const pattern = PathToRegexp.compile(API.ASSOCIATION.ATTENDANCES.LIST);
  return Request({
    url: pattern({ sid: payload.schoolId, aid: payload.associationId }),
    method: 'get',
    params: {
      limit: 10000,
    }
  })
}

export const fetchAttendancesEntities = (payload) => {
  const pattern = PathToRegexp.compile(API.ASSOCIATION.ATTENDANCES.MGET);
  return Request({
    url: pattern({ sid: payload.schoolId, aid: payload.associationId }),
    method: 'post',
    data: {
      ids: payload.ids,
    }
  })
}

export const signAttendances = (payload) => {
  const pattern = PathToRegexp.compile(API.ASSOCIATION.ATTENDANCES.SIGN);
  return Request({
    url: pattern({ sid: payload.schoolId, aid: payload.associationId, vid: payload.attendancesId }),
    method: 'get',
    params: {
      lx: payload.place_x,
      ly: payload.place_y,
    }
  })
}

