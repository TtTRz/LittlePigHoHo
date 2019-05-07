import PathToRegexp from 'path-to-regexp';
import Request from '../utils/request'
import { API } from '../constants/apis'
import get from 'lodash.get';
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
export const getAttendancesEntity = (payload) => {
  const pattern = PathToRegexp.compile(API.ASSOCIATION.ATTENDANCES.CURD);
  return Request({
    method: 'get',
    url: pattern({sid: payload.schoolId, aid: payload.associationId, vid: payload.attendancesId}),
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

export const leaveAttendances = (payload) => {
  const pattern = PathToRegexp.compile(API.ASSOCIATION.ATTENDANCES.LEAVE);
  return Request({
    url: pattern({ sid: payload.schoolId, aid: payload.associationId, vid: payload.attendancesId }),
    method: 'post',
    data: {
      description: payload.description,
    }
  })
}

export const delAttendances = (payload) => {
  const pattern = PathToRegexp.compile(API.ASSOCIATION.ATTENDANCES.CURD);
  return Request({
    url: pattern({ sid: payload.schoolId, aid: payload.associationId, vid: payload.attendancesId }),
    method: 'delete',
  })
}

export const getSignMembersList = (payload) => {
  const pattern = PathToRegexp.compile(API.ASSOCIATION.ATTENDANCES.SIGN);
  return Request({
    url: pattern({sid: payload.schoolId, aid: payload.associationId, vid: payload.attendancesId}),
    method: 'post',
    data: {
      type: payload.type,
      department: get(payload,'department', 0),
    }
  })
}

export const getMapDistance = (payload) => {
  return Request({
    url: 'https://apis.map.qq.com/ws/distance/v1/?parameters',
    method: 'get',
    params: {
      mode: 'walking',
      from: payload.placeA.place_x + "," + payload.placeA.place_y,
      to: payload.placeB.place_x + "," + payload.placeB.place_y,
      key: 'BAMBZ-3J3WF-COKJX-NCOJX-OMK6J-34BF4',
    },
    thirdAPI: true,
  })
};
export const editAttendances = (payload) => {
  const pattern = API.ASSOCIATION.ATTENDANCES.CURD;
  return Request({
    url: pattern({sid: payload.schoolId, aid: payload.associationId, vid: payload.attendancesId}),
    method: 'put',
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
export const manageAttendances = payload => {
  const pattern = API.ASSOCIATION.ATTENDANCES.MANAGE;
  return Request({
    url: pattern({sid: payload.schoolId, aid: payload.associationId, vid: payload.attendancesId}),
    method: 'post',
    data: {
      ...payload.members
    }
  })
}
