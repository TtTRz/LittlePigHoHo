
export const API = {
  ACCOUNT: {
    REGISTER: 'accounts/register',
    ME: 'accounts/me',
    CURD: 'accounts/:aid',
    CHANGE_SCHOOL: 'accounts/update_id',
  },
  SCHOOL: {
    LIST: 'schools/list',
    ADD: 'schools',
    CURD: 'schools/:sid',
    MGET: 'schools/_mget',
  },
  ASSOCIATION: {
    ACCOUNT: 'schools/:sid/associations/:aid/accounts/:acid',
    LIST: 'schools/:sid/associations/list',
    ADD: 'schools/:sid/associations',
    CURD: 'schools/:sid/associations/:aid',
    MGET: 'schools/:sid/associations/_mget',
    JOIN: 'schools/:sid/associations/:aid/accounts',
    MEMBERS: {
      LIST: 'schools/:sid/associations/:aid/accounts/list',
      MGET: 'schools/:sid/associations/:aid/accounts/_mget',
      CURD: 'schools/:sid/associations/:aid/accounts/:acid',
    },
    DEPARTMENT: {
      LIST: 'schools/:sid/associations/:aid/departments/list',
      MGET: 'schools/:sid/associations/:aid/departments/_mget',
      ADD: 'schools/:sid/associations/:aid/departments',
      CURD: 'schools/:sid/associations/:aid/departments/:did',
    }
  },
  NOTICES: {
    LIST: 'schools/:sid/associations/:aid/notices/list',
    ADD: 'schools/:sid/associations/:aid/notices',
    CURD: 'schools/:sid/associations/:aid/notices/:nid',
    MGET: 'schools/:sid/associations/:aid/notices/_mget',
  }

};


