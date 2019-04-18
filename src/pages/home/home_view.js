import Taro from '@tarojs/taro'
import { View, Button, Text, Swiper, SwiperItem, Image} from '@tarojs/components'
import {
  AtButton,
  AtDrawer,
  AtIcon,
  AtTabBar,
  AtList,
  AtListItem,
  AtMessage,
  AtDivider,
  AtFloatLayout,
  AtTextarea,
  AtCheckbox, AtActivityIndicator
} from 'taro-ui'
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
    departmentList: state.department.list,
    isLoading: state.loading.global,
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
    isOpened: false,
    value: '',
    departVisible: false,
    departmentCheckedList: [],
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
        }).then(() => {
          this.props.dispatch({
            type: 'department/getDepartmentList',
            payload: {
              schoolId: this.props.account.school_id,
              associationId: parseInt(Taro.getStorageSync('associationId'), 10),
            }
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
  handleDepartChange = (value) => {
    this.setState({
      departmentCheckedList: value
    })
  }
  handleAssoChange = () => {
    this.setState({
      assoVisible: true,
    })
  };
  handleSubmitClick = () => {
    // this.props.dispatch({
    //   type: '',
    //   payload: {
    //
    //   }
    // })
    this.setState({
      value: '',
      assoVisible: false,
      isOpened: false,
      departVisible: false,
      departmentCheckedList: [],
    })
  }
  handleShowDrawer = () => {
    this.setState({
      departVisible: true,
    })
  }
  handleDepartClose = () => {
    this.setState({
      departVisible: false,
    })
  }
  renderAssoItems = () => {
    return this.props.associationList.map((item) => {
      return (item.name)
    })
  }
  handleInputChange = ({target}) => {
    this.setState({
      value: target.value,
    })
  }
  renderCheckboxOption = () => {
    if(this.props.association.role === 0) {
      return null;
    } else {
      let checkbox = [{
        value: 'all',
        label: '全部',
      }]
      if(this.props.departmentList.length === 0) {
        return checkbox;
      }
      this.props.departmentList.forEach((item) => {
        checkbox.push({
          value: item.id,
          label: item.name,
          disabled: this.state.departmentCheckedList.includes('all')
        })
      })
      return checkbox;
    }

  }
  handleFloatClose = () => {
    this.setState({
      isOpened: false,

    })
  }
  handleShowFloat = () => {
    this.setState({
      departVisible: false,
      isOpened: true,
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
            <ActionGridView type='action' onShowDrawer={this.handleShowDrawer} associationId={this.props.association.id} />
          </View>
          <View className='home-view-action-grid'>
            <ActionGridView type='association' associationId={this.props.association.id} />
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
        {/*发布通知*/}
        <AtFloatLayout  isOpened={this.state.isOpened} title='通知信息' onClose={this.handleFloatClose}>
          <View className='float-layout'>
            <AtTextarea
              value={this.state.value}
              onChange={this.handleInputChange.bind(this)}
              maxLength={200}
              height={200}
              placeholder='请输入您发布的通知'
            />
            <View className='float-layout-button'>
              <AtButton
                style={{bottom: '0'}}
                type='primary'
                onClick={this.handleSubmitClick}
                full
              >
                发布
              </AtButton>
            </View>
          </View>
        </AtFloatLayout>
        <AtDrawer
          show={this.state.departVisible}
          right
          onClose={this.handleDepartClose}
          mask
        >
          {this.props.isLoading ? <View style={{ position: 'relative', marginTop: '5em'}}>
            <AtActivityIndicator mode='center'></AtActivityIndicator>
          </View> : <View>
            <AtCheckbox
              options={this.renderCheckboxOption()}
              selectedList={this.state.departmentCheckedList}
              onChange={this.handleDepartChange}
            />
            <View
              style={{ marginTop: '5em'}}
            >
              <AtButton
                disabled={this.state.departmentCheckedList.length === 0}
                type='primary'
                onClick={this.handleShowFloat}
              >
                确认
              </AtButton>
            </View>
          </View>}
        </AtDrawer>
      </View>
    )
  }
}


export default HomeView;
