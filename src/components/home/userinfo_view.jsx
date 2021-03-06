import Taro from '@tarojs/taro'
import { View, Text} from '@tarojs/components'
import { AtButton,  AtAvatar, AtIcon, AtDrawer } from 'taro-ui'
import {connect} from "@tarojs/redux";
import PropTypes from 'prop-types';

import './userinfo_view.scss'
import HoAvatar from './widgets/avatar';

class UserInfoView extends Taro.PureComponent {

  config = {
    navigationBarTitleText: '快来LPHH的世界冒险～'
  };

  static propTypes = {
    account: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {

  };

  state = {

  }

  render() {
    return (

      <View className='userinfo-view'>
          <HoAvatar url={this.props.account.avator}/>
          <Text>
            {this.props.account.nickname}
          </Text>
      </View>
    )
  }

}

export default UserInfoView;
