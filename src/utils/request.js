import Taro from '@tarojs/taro';

import { baseUrl, noConsole, deBug } from '../config';

export default (options = { method: 'GET', data: {}, header: null }) => {
  if(!noConsole) {
    console.log(
      `${new Date().toLocaleString()}【 M=${options.url} 】P=${JSON.stringify(
        options.data
      )}`
    )
  }
  console.log(Taro.getStorageSync('token'))
  console.log(options.header)
  return Taro.request({
    url: baseUrl + options.url + (deBug ? '?debug=1' : ''),
    data: {
      ...options.data,
    },
    header: {
      'Content-Type': 'application/json',
      'hoho-auth-model': 'client',
      'hoho-auth-token': options.header !== undefined ? options.header : Taro.getStorageSync('token').toString()
    },
    method: options.method.toUpperCase(),
  }).then(res => {
    const { statusCode, data } = res;
    if (statusCode >= 200 && statusCode < 300 ) {
      if (!noConsole) {
        console.log(
          `${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`,
          res.data
        );
      }
      // if (data.status !== 'ok') {
      //   Taro.showToast({
      //     title: `${res.data.error.message}~` || res.data.error.code,
      //     icon: 'none',
      //     mask: true,
      //   });
      // }
      return data;
    } else {
      throw new Error (`网络请求错误，状态码${statusCode}`)
    }
  });
};
