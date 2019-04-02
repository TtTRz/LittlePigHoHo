import Taro from '@tarojs/taro'
import { View, Button, Text, Swiper, SwiperItem } from '@tarojs/components'
import {AtButton, AtDrawer, AtIcon, AtTabBar, AtList, AtListItem, AtMessage } from 'taro-ui'
import {connect} from "@tarojs/redux";
import PropTypes from 'prop-types';
import HoAvatar from "../../components/home/widgets/avatar";

const mapStateToProps = (state) => {
  console.log(state);
  return {
    account: state.account,
  }
};

@connect(mapStateToProps)
class AccountEditorView extends Taro.PureComponent {
  config = {
    navigationBarTitleText: '个人信息'
  };
  static propTypes = {
    account: PropTypes.shape({}).isRequired,
  };
  render() {
    return (
      <HoAvatar url={this.props.account.avator} />
    )
  }
}
export default AccountEditorView;
