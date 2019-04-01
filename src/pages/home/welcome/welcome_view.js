import Taro from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux';
import encryptedDataTools from '../../../utils/encryptedDataTools'

import './welcome_view.scss'

// @connect(({ home, loading }) => ({
//   ...home,
//   ...loading,
// }))
const mapStateToProps = (state) => {
  return { account: state.account };
};

@connect(mapStateToProps, null)
class WelcomeView extends Taro.PureComponent {
  config = {
    navigationBarTitleText: '快来LPHH的世界冒险～'
  };
  state = {
    isLoading: false,
  }
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  handleLoginClick = () => {
    this.setState({
      isLoading: true,
    });
    this.props.dispatch({
      type: 'account/login',
      payload: {},
    })
  };
  render() {
    return (
      <View className='welcome-view'>
        <View className='at-row at-row__justify--center'>
          <View className='at-col at-col-5'>
            <AtButton
              type='primary'
              loading={this.state.isLoading}
              circle
              onClick={this.handleLoginClick}
              openType='getUserInfo'
            >
              开始探险HoHo～
            </AtButton>

          </View>

        </View>
      </View>
    )
  }
}

export default WelcomeView;
