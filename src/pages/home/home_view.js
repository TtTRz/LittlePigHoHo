import Taro from '@tarojs/taro'
import { View, Button, Text, Swiper, SwiperItem } from '@tarojs/components'
import {AtButton, AtDrawer, AtIcon, AtTabBar, AtList, AtListItem, AtMessage } from 'taro-ui'
import {connect} from "@tarojs/redux";
import PropTypes from 'prop-types';
import UserInfoView from '../../components/home/userinfo_view';
import ActionGridView from '../../components/home/action_grid_view'
import './home_view.scss'

const mapStateToProps = (state) => {
  console.log(state);
  return {
    account: state.account,
  }
};

@connect(mapStateToProps)
class HomeView extends Taro.PureComponent {
  config = {
    navigationBarTitleText: 'HoHo~'
  };

  static propTypes = {
    account: PropTypes.shape({}).isRequired,
  };

  state = {
    currentTab: 1,
  };

  componentWillReceiveProps (nextProps) {
  }
  componentWillMount() {
  }
  componentWillUnmount () {

  }

  componentDidShow () {
    Taro.atMessage({
      'message': '欢迎回来～～',
      'type': 'success',
      duration: 3000,
    })
  }

  componentDidHide () { }


  handleTabChange = (value) => {
    this.setState({
      currentTab: value,
    })
  };


  TABLIST = [{
    title: '消息',
    iconType: 'bullet-list',
  }, {
    title: '主页',
    iconType: 'home',
  }, {
    title: '个人',
    iconType: 'user'
  }];
  ACCOUNT_VIEW_PATH = {
    school: '',
    aboutus: '',
    opinion: '',
    info: '/pages/account/account_editor_view',
  }
  handleListClick = (value) => {
    Taro.navigateTo({
      url: this.ACCOUNT_VIEW_PATH[value],
    })
  }

  render() {
    return (
      <View>
        {this.state.currentTab === 0 &&  <View className='message-view'>
          message
        </View>}
        {this.state.currentTab === 1 && <View className='home-view'>
          <Swiper
            className='test-h'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            indicatorDots
            autoplay
            interval={5000}
            duration={1000}
          >
            <SwiperItem>
              <View >121商店大甩卖</View>
            </SwiperItem>
            <SwiperItem>
              <View >cyt cici 低至3折</View>
            </SwiperItem>
            <SwiperItem>
              <View >wyh xj 买一送一</View>
            </SwiperItem>
          </Swiper>
          <View>
            <ActionGridView />
          </View>
        </View>}
        {this.state.currentTab === 2 && <View className='account-view'>
          <View className='user-info-view'>
            <UserInfoView
              account={this.props.account}
            />
            <AtList hasBorder={false}>
              <AtListItem
                hasBorder={false}
                title='选择学校'
                arrow='right'
                iconInfo={{ size: 25, color: '#78A4FA', value: 'school', }}
                onClick={this.handleListClick.bind(this, 'school')}
              />
              <AtListItem
                hasBorder={false}
                title='信息修改'
                arrow='right'
                iconInfo={{ size: 25, color: '#78A4FA', value: 'school', }}
                onClick={this.handleListClick.bind(this, 'info')}
              />
              <AtListItem
                hasBorder={false}
                title='关于我们'
                arrow='right'
                iconInfo={{ size: 25, color: '#78A4FA', value: 'school', }}
                onClick={this.handleListClick.bind(this, 'aboutus')}
              />
              <AtListItem
                hasBorder={false}
                title='意见反馈'
                arrow='right'
                iconInfo={{ size: 25, color: '#78A4FA', value: 'school', }}
                onClick={this.handleListClick.bind(this, 'opinion')}
              />
            </AtList>
          </View>
        </View>}
        <AtTabBar
          fixed
          tabList={this.TABLIST}
          current={this.state.currentTab}
          onClick={this.handleTabChange.bind(this)}
        />
        <AtMessage />
      </View>
    )
  }
}


export default HomeView;
