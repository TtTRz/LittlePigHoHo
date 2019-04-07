
export const API = {
  ACCOUNT: {
    REGISTER: 'accounts/register',
    ME: 'accounts/me',
    CURD: 'accounts/:aid',
  },
  SCHOOL: {
    LIST: 'schools/list',
    ADD: 'schools',
    CURD: 'schools/:sid',
    MGET: 'schools/_mget',
  },
  ASSOCIATION: {
    LIST: 'schools/:sid/associations/list',
    ADD: 'schools/:sid/associations',
    CURD: 'schools/:sid/associations/:aid',

  }

};


