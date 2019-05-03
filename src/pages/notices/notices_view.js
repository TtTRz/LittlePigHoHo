import Taro from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import {AtButton, AtMessage, AtDrawer, AtCard, AtInput,AtTextarea, AtFloatLayout} from 'taro-ui'
import { connect } from '@tarojs/redux';
import './notices_view.scss'
const mapStateToProps = (state) => {
  const isLoading = state.loading.global;
  const schoolId = state.account.school_id;
  return {
    isLoading,
    schoolId,
  };
};


@connect(mapStateToProps, null)
class NoticesView extends Taro.PureComponent {
  noticesList = [{
    association: {
      name: '泰罗小队'
    },
    department: {
      name: '嘿嘿部'
    },
    update_time:'2018-1-1',
    content:'asdasdadasdafasjdasjdhasd',
  }, {
    association: {
      name: '泰罗小队'
    },
    department: {
      name: '嘿嘿部'
    },
    update_time:'2018-1-1',
    content:'asdasdadasdafasjdasjdhasd',
  }, {
    association: {
      name: '泰罗小队'
    },
    department: {
      name: '嘿嘿部'
    },
    update_time:'2018-1-1',
    content:'asdasdadasdafasjdasjdhasd',
  }, {
    association: {
      name: '泰罗小队'
    },
    department: {
      name: '嘿嘿部'
    },
    update_time:'2018-1-1',
    content:'asdasdadasdafasjdasjdhasd',
  }, {
    association: {
      name: '泰罗小队'
    },
    department: {
      name: '嘿嘿部'
    },
    update_time:'2018-1-1',
    content:'asdasdadasdafasjdasjdhasd',
  }, {
    association: {
      name: '泰罗小队'
    },
    department: {
      name: '嘿嘿部'
    },
    update_time:'2018-1-1',
    content:'asdasdadasdafasjdasjdhasd',
  }, {
    association: {
      name: '泰罗小队'
    },
    department: {
      name: '嘿嘿部'
    },
    update_time:'2018-1-1',
    content:'asdasdadasdafasjdasjdhasd',
  }, {
    association: {
      name: '泰罗小队'
    },
    department: {
      name: '嘿嘿部'
    },
    update_time:'2018-1-1',
    content:'asdasdadasdafasjdasjdhasd',
  }];
  ASSOCIATION_LIST = [{
    name: '泰罗小队',
    department: [{
      name: '泰罗'
    }, {
      name: '赛罗'
    }]
  }, {
    name: '奥特之父',
    department: [{
      name: '泰罗'
    }]
  }]
  componentDidShow() {
    this.props.dispatch({
      type: 'association/getAssociationListMe',
      payload: {
        schoolId: this.props.schoolId,
      }
    })
  }

  state = {
    assoVisible: false,
    departVisible: false,
    isOpened: false,
    associationIndex: 0,
    value: '',
  }
  handleInputChange = ({target}) => {
    this.setState({
      value: target.value,
    })
  }
  showDrawer = () => {
    this.setState({
      assoVisible: true,
    })
  }
  handleClose = () => {
    this.setState({
      assoVisible: false,
      departVisible: false,
      isOpened: false,
      associationIndex: 0,
    })
  }
  renderAssoItems = () => {
    if(this.ASSOCIATION_LIST.length === 0) return null;

    return this.ASSOCIATION_LIST.map((item) => {
      return (item.name)
    })
  }
  renderDepartItems = () => {
    if(this.ASSOCIATION_LIST.length === 0) return null;
    return this.ASSOCIATION_LIST[this.state.associationIndex].department.map((item) => {
      return (item.name)
    })
  }
  handleAssoItemsClick = (index) => {

    this.setState({
      assoVisible: false,
      departVisible: true,
      associationIndex: index,
    })
  }
  handleDepartItemsClick = (index) => {
    this.setState({
      departVisible: false,
      isOpened: true,
    })
  }
  handleAssoClose = () => {
    this.setState({
      assoVisible: false,
    })
  }
  handleDepartClose = () => {
    this.setState({
      departVisible: false,
    })
  }
  render() {
    return (
      <View className='notices-view'>
        <View className='header'>
          <View className='title'>
            消息列表
          </View>
        </View>
        {/*<View className='notices-add-button'>*/}
        {/*<AtButton full type='secondary' onClick={this.showDrawer}>发布</AtButton>*/}
        {/*</View>*/}
        <View className='notices-list'>
          {this.noticesList.map((item) => {
            return (
              <AtCard
                isFull
                note={item.update_time}
                title={item.association.name}
                extra={item.department.name}
              >
                {item.content}
              </AtCard>
            )
          })}
          <View className='notice-bottom'>
            无更多通知
          </View>
        </View>
        {/*<AtDrawer*/}
          {/*show={this.state.assoVisible}*/}
          {/*items={this.renderAssoItems()}*/}
          {/*onItemClick={this.handleAssoItemsClick}*/}
          {/*mask*/}
          {/*onClose={this.handleAssoClose}*/}
        {/*>*/}
        {/*</AtDrawer>*/}
        {/*<AtDrawer*/}
          {/*show={this.state.departVisible}*/}
          {/*right*/}
          {/*items={this.renderDepartItems()}*/}
          {/*onItemClick={this.handleDepartItemsClick}*/}
          {/*onClose={this.handleDepartClose}*/}
          {/*mask*/}
        {/*>*/}
        {/*</AtDrawer>*/}
        {/*<AtFloatLayout  isOpened={this.state.isOpened} title='通知信息' onClose={this.handleClose}>*/}
          {/*<View className='float-layout'>*/}
            {/*<AtTextarea*/}
              {/*value={this.state.value}*/}
              {/*onChange={this.handleInputChange.bind(this)}*/}
              {/*maxLength={200}*/}
              {/*height={200}*/}
              {/*placeholder='请输入您发布的通知'*/}
            {/*/>*/}
            {/*<View className='float-layout-button'>*/}
              {/*<AtButton*/}
                {/*style={{bottom: '0'}}*/}
                {/*type='primary'*/}
                {/*onClick={this.handleSubmitClick}*/}
                {/*full*/}
              {/*>*/}
                {/*发布*/}
              {/*</AtButton>*/}
            {/*</View>*/}
          {/*</View>*/}
        {/*</AtFloatLayout>*/}
      </View>
    )
  }
}

export default NoticesView;
