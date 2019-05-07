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

  return {
    isLoading,
    schoolId,
    association,
    account,
  };
};


@connect(mapStateToProps)
class NoticesView extends Taro.PureComponent {
  componentWillMount() {
    Taro.showLoading()
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'account/getDashboard',
      payload: {},
    }).then(() => {
      Taro.hideLoading()
    })
  }
  state = {
    isOpened: false,
    notice: {},
  }
  handleShowModal = (item) => {
    this.setState({
      isOpened: true,
      notice: item,
    })
  }
  renderNote= (item) => {
    const date = moment.unix(get(item,'start_time', '')).format('YYYY-MM-DD')
    const author = get(item,'author.nickname', '未知');
    return author + " " + date;
  }
  handleCloseModal = () => {
    this.setState({
      isOpened: false,
      notice: {},
    })
  }
  renderNoticesList = () => {
    let noticeList = [];
    for( let i in this.props.account.dashboard.notices) {
      let item = this.props.account.dashboard.notices[i];
      item.forEach((it) => {
        noticeList.push({...it, name: i});
      })
    }
    noticeList.sort((a, b) => {
      return b.start_time - a.start_time;
    })
    return noticeList;
  }
  render() {
    const noticesList = this.renderNoticesList()
    return (
      <View className='notices-view'>
        {noticesList.length === 0 && <View style={{ margin: '1em auto'}}>
          暂无通知
        </View>}
        {noticesList.length !== 0 && <View className='notices-list'>
          {noticesList.map((item, index) => {
            return (
              <View key={index} className='card'>
                <AtCard
                  onClick={this.handleShowModal.bind(this,item)}
                  note={this.renderNote(item)}
                  title={item.name}
                  extra={get(item, 'department', '')}
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
                  {moment.unix(get(this.state.notice,'start_time', '')).format('YYYY-MM-DD')}
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
