import Taro from '@tarojs/taro';

import { baseUrl, noConsole, deBug } from '../config';

export default (options = { method: 'GET', data: {}, header: null, params: {} }) => {
  if(!noConsole) {
    console.log(
      `${new Date().toLocaleString()}【 M=${options.url} 】P=${JSON.stringify(
        options.data
      )}`
    )
  }
  let urlParams = '';
  let firstParam = true;
  for (let i in options.params) {
    if( firstParam ) {
      firstParam = false;
      if(options.params[i] !== undefined && options.params[i] !== "" && options.params[i] !== null) {
        urlParams = urlParams + '?' + i + '=' + options.params[i];

      }
    } else {
      if(options.params[i] !== undefined && options.params[i] !== "" && options.params[i] !== null) {
        urlParams = urlParams + '&' + i + '=' + options.params[i];

      }    }
  }
  let debugParams = '&debug=1';
  if(urlParams === '') {
    debugParams = '?debug=1'
  }
  return Taro.request({
    url: baseUrl + options.url + urlParams + (deBug ? debugParams : ''),
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
      console.log(res);
      console.log('报错详细信息', options.url, options.data)
      Taro.showToast({
        title: data.error,
        icon: 'none',
        mask: true,
      });
      throw new Error (`网络请求错误，状态码${statusCode}`)
    }
  });
};
