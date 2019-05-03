import Taro from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import {AtButton, AtMessage, AtDrawer, AtCard, AtModal, AtInput,AtTextarea,  AtModalHeader, AtModalContent, AtModalAction,AtFloatLayout} from 'taro-ui'
import { connect } from '@tarojs/redux';
import './notices_view.scss'
import moment from "moment";
import get from 'lodash.get'
const mapStateToProps = (state) => {
  const isLoading = state.loading.global;
  const account = state.account;
  const schoolId = state.account.school_id;
  const association = state.association.myEntity;
  const noticesList = state.notices.assoNoticesList;
  const associationList = state.association.list;
  return {
    isLoading,
    schoolId,
    association,
    noticesList,
    associationList,
    account,
  };
};


@connect(mapStateToProps)
class NoticesView extends Taro.PureComponent {
  componentWillMount() {
    Taro.showLoading('加载中')
  }
  config ={
    enablePullDownRefresh: true,
  }
  onPullDownRefresh() {
    Taro.showNavigationBarLoading()
    Taro.showLoading({ title: '刷新中...' })

  }
  componentDidMount() {
    this.props.dispatch({
      type: 'notices/getNoticesList',
      payload: {
        schoolId: this.props.schoolId,
        associationId: this.props.association.id,
      }
    }).then(() => {
      Taro.hideLoading()
    })
  }
  state = {
    isOpened: false,
    notice: {},
  }
  handleShowModal = (item) => {
    console.log('show',this.state)
    this.setState({
      isOpened: true,
      notice: item,
    })
  }
  renderNote= (item) => {
    const date = moment.unix(get(item,'update_time', '')).format('YYYY-MM-DD')
    const author = get(item,'author.nickname', '未知');
    return author + " " + date;
  }
  renderTitle = (item) => {
    const i = this.props.associationList.filter((a) => a.id === item.association.id);
    return i[0].name;
  }
  handleCloseModal = () => {
    this.setState({
      isOpened: false,
      notice: {},
    })
    console.log(this.state)
  }
  render() {
    const noticesList = this.props.noticesList;
    return (
      <View className='notices-view'>
        {noticesList.length === 0 && <View style={{ margin: '1em auto'}}>
          暂无通知
        </View>}
        {noticesList.length !== 0 && <View className='notices-list'>
          {noticesList.map((item) => {
            return (
              <View className='card'>
                <AtCard
                  onClick={this.handleShowModal.bind(this,item)}
                  note={this.renderNote(item)}
                  title={this.renderTitle(item)}
                  extra={get(item, 'department', '部门')}
                >
                  <View>
                    标题: {item.title}
                  </View>
                  <View>
                    内容: {item.content}
                  </View>
                </AtCard>
              </View>
            )
          })}
        </View>}
        <View className='notice-bottom'>

        </View>
        <AtModal onClose={this.handleCloseModal} isOpened={this.state.isOpened}>
          <AtModalHeader>{this.state.notice.title}</AtModalHeader>
          <AtModalContent>
            <View className='notice-modal'>
              <View className='content'>
                {this.state.notice.content}
              </View>
              <View className='extra'>
                <View className='author'>
                  {this.state.notice.author.nickname}
                </View>
                <View className='date'>
                  {moment.unix(get(this.state.notice,'update_time', '')).format('YYYY-MM-DD')}
                </View>
              </View>
            </View>
          </AtModalContent>
        </AtModal>
      </View>
    )
  }
}

export default NoticesView;
