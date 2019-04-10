import Taro from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { AtButton, AtMessage } from 'taro-ui'
import { connect } from '@tarojs/redux';

import './welcome_view.scss'
import Request from "src/utils/request";
import {API} from "src/constants/apis";

// @connect(({ home, loading }) => ({
//   ...home,
//   ...loading,
// }))
const mapStateToProps = (state) => {
  const isLoading = state.loading.effects['account/login'];
  return {
    account: state.account,
    isLoading,
  };
};

@connect(mapStateToProps, null)
class WelcomeView extends Taro.PureComponent {
  config = {
    navigationBarTitleText: '快来LPHH的世界冒险～'
  };
  state = {
    loading: false,
  }
  componentWillReceiveProps (nextProps) {
  }

  componentWillUnmount () { }
  componentWillMount() {
    Taro.clearStorageSync();
  }

  componentDidShow () { }

  componentDidHide () { }

  handleLoginClick = () => {
    Taro.login({
      success: res => {
        //发送res.code到后台换取openId，sessionKey， unionId
        Taro.getUserInfo({
          success: re => {
            Taro.setStorageSync('avator', re.userInfo.avatarUrl)
            this.props.dispatch({
              type: 'account/login',
              payload: {
                token: res.code,
                nickname: re.userInfo.nickName,
                sex: re.userInfo.gender,
              },
            }).then(() => {
              if(this.props.account.id) {
                Taro.vibrateLong({
                  success: () => {
                    Taro.redirectTo({
                      url: '/pages/home/home_view',
                    })
                  }
                })

              } else {
                Taro.vibrateLong({
                  success: () => {
                    console.log('登录失败');
                    Taro.atMessage({
                      'message': '网络错误，请稍后重试！',
                      'type': 'error',
                      duration: 5000,
                    })
                  }
                })
              }
            })
          }
        })
      }
    });
  };
  render() {
    return (
      <View className='welcome-view'>
        <View className='button-view'>
          <AtButton
            type='primary'
            loading={this.props.isLoading}
            circle
            onClick={this.handleLoginClick}
            openType='getUserInfo'
            full={false}
            disabled={this.props.isLoading}
          >
            {!this.props.isLoading && <Text>
              探险HoHo～
            </Text>}
            {this.props.isLoading && <Text>
              准备中...
            </Text>}
          </AtButton>
          <AtMessage />
        </View>

      </View>
    )
  }
}

export default WelcomeView;
