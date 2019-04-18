import Taro from '@tarojs/taro'
import { View, Button, Text, Swiper, SwiperItem, Image} from '@tarojs/components'
import {AtButton, AtDrawer, AtIcon, AtTabBar, AtList, AtListItem, AtMessage, AtDivider} from 'taro-ui'
import {connect} from "@tarojs/redux";
import PropTypes from 'prop-types';
import UserInfoView from '../../components/home/userinfo_view';
import ActionGridView from '../../components/home/action_grid_view'
import './home_view.scss'
import Img1 from '../../static/img/lphh.jpeg'
import NoticesView from '../notices/notices_view'
import  get  from 'lodash.get';
import HoTabBar from "../../components/widgets/HoTabBar";


const mapStateToProps = (state) => {

  return {
    account: state.account,
    associationList: state.association.list,
    association: state.association.myEntity,
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
    assoVisible: false,
  };

  componentWillMount() {
    if(this.$router.params.tabId) {
      this.setState({
        currentTab: parseInt(this.$router.params.tabId, 10),
      })
    }
  }
  componentWillUnmount () {

  }

  componentDidShow () {
    if(this.props.account.school_id === "") {
      Taro.redirectTo({
        url: '/pages/account/account_school_view',
      })
    }
    this.props.dispatch({
      type: 'account/accountMe',
      payload: ({
        token: Taro.getStorageSync('token')
      })
    }).then(() => {
      this.props.dispatch({
        type: 'association/getAssociationListMe',
        payload: ({
          schoolId: this.props.account.school_id,
        })
      })
      if(Taro.getStorageSync('associationId') !== "") {
        this.props.dispatch({
          type: 'association/getAssociationEntityMe',
          payload: ({
            schoolId: this.props.account.school_id,
            associationId: parseInt(Taro.getStorageSync('associationId'), 10),
          })
        })
      } else {
        this.setState({
          assoVisible: true,
        })
      }
    })
  }

  componentDidHide () { }

  handleAssoItemsClick = (index) => {
    Taro.setStorageSync('associationId', this.props.associationList[index].id);
    this.props.dispatch({
      type: 'association/getAssociationEntityMe',
      payload: ({
        schoolId: this.props.account.school_id,
        associationId: this.props.associationList[index].id,
      })
    })
    this.setState({
      assoVisible: false,
    })
  };
  handleTabChange = (value) => {
    this.setState({
      currentTab: value,
    })
  };
  handleAssoClose = () => {
    this.setState({
      assoVisible: false,
    })
  }

  ACCOUNT_VIEW_PATH = {
    school: '/pages/account/account_school_view',
    aboutus: '',
    opinion: '',
    info: '/pages/account/account_editor_view',
  };

  handleListClick = (value) => {
    Taro.navigateTo({
      url: this.ACCOUNT_VIEW_PATH[value],
    })
  };

  handleAssoChange = () => {
    this.setState({
      assoVisible: true,
    })
  };

  renderAssoItems = () => {
    if(this.props.associationList.length === 0) return null;

    return this.props.associationList.map((item) => {
      return (item.name)
    })
  }
  render() {
    return (
      <View className='page-layout'>
        {this.state.currentTab === 0 &&  <View className='message-view'>
          <NoticesView />
        </View>}
        {this.state.currentTab === 1 && <View className='home-view'>
          <View className='home-view-header'>
            <View className='association-title'>
              {get(this.props.association, 'name', '您尚未选择协会')}
            </View>
            <View className='action-bar'>
              <AtButton type='secondary' size='small' onClick={this.handleAssoChange}>切换</AtButton>
            </View>
          </View>
          <View className='home-view-swiper'>
            <Swiper
              style={{ height: '150px' }}
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
                <Image
                  style={{ width: '100%' }}
                  src={Img1}
                />
              </SwiperItem>
              <SwiperItem>
                <View >cyt cici 低至3折</View>
              </SwiperItem>
              <SwiperItem>
                <View >wyh xj 买一送一</View>
              </SwiperItem>
            </Swiper>
          </View>
          <View className='home-view-action-grid'>
            <ActionGridView type='action' />
          </View>
          <View className='home-view-action-grid'>
            <ActionGridView type='association' />
          </View>
        </View>}
        {this.state.currentTab === 2 && <View className='account-view'>
          <UserInfoView
            account={this.props.account}
          />
          <View className='account-action-list'>
            <AtList hasBorder={false}>
              <AtListItem
                hasBorder={false}
                title='选择学校'
                arrow='right'
                // iconInfo={{ size: 22, prefixClass: 'fa', color: '#78A4FA', value: 'university', }}
                onClick={this.handleListClick.bind(this, 'school')}
              />
              <AtListItem
                hasBorder={false}
                title='信息修改'
                arrow='right'
                // iconInfo={{ size: 21, prefixClass: 'fa',color: '#78A4FA', value: 'edit ', }}
                onClick={this.handleListClick.bind(this, 'info')}
              />
              <AtListItem
                hasBorder={false}
                title='关于我们'
                arrow='right'
                // iconInfo={{ size: 23,prefixClass: 'fa', color: '#78A4FA', value: 'school', }}
                onClick={this.handleListClick.bind(this, 'aboutus')}
              />
              <AtListItem
                hasBorder={false}
                title='意见反馈'
                arrow='right'
                // iconInfo={{ size: 23, prefixClass: 'fa',color: '#78A4FA', value: 'school', }}
                onClick={this.handleListClick.bind(this, 'opinion')}
              />
            </AtList>
          </View>
        </View>}
        {/*<AtTabBar*/}
          {/*fixed*/}
          {/*tabList={this.TABLIST}*/}
          {/*current={this.state.currentTab}*/}
          {/*onClick={this.handleTabChange.bind(this)}*/}
        {/*/>*/}
        <HoTabBar
          current={this.state.currentTab}
          onClick={this.handleTabChange}
          onTabChange={this.handleTabChange}
        />
        <AtMessage />
        <AtDrawer
          right
          show={this.state.assoVisible}
          items={this.renderAssoItems()}
          onItemClick={this.handleAssoItemsClick}
          mask
          onClose={this.handleAssoClose}
        >
        </AtDrawer>
      </View>
    )
  }
}


export default HomeView;
