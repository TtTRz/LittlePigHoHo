import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import 'taro-ui/dist/style/index.scss'



import dva from './utils/dva'
import models from './models'

const dvaApp = dva.createApp({
  initialState: {

  },
  models: models,
});

const store = dvaApp.getStore();

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }


class App extends Component {

  config = {
    pages: [
      'pages/home/welcome/welcome_view',
      'pages/home/home_view',
      'pages/account/account_editor_view',
      'pages/account/account_school_view',
      'pages/association/association_create_view',
      'pages/association/association_list_view',
      'pages/association/association_view',
      'pages/association/department/department_create_view',
      'pages/association/department/department_view',
      'pages/notices/create_notice_view',
      'pages/attendances/attendances_list_view',
      'pages/attendances/attendances_view',
      'pages/attendances/create_attendances_view',
      'pages/notices/notices_list_view',
      'pages/notices/notice_view',

    ],
    window: {
      navigationBarBackgroundColor: 'white',
      navigationBarTitleText: 'LPHH',
      navigationBarTextStyle: 'black',
      backgroundTextStyle: "dark",
    },
    permission: {
      "scope.userLocation": {
        desc: '将获取您的位置信息'
      }
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
