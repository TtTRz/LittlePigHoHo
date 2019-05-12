import Taro from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import {AtButton, AtMessage, AtDrawer, AtCard, AtModal, AtInput,AtTextarea,  AtModalHeader, AtModalContent, AtModalAction,AtFloatLayout} from 'taro-ui'
import { connect } from '@tarojs/redux';
import './notices_list_view.scss'
import moment from "moment";
import get from 'lodash.get'
import HoCard from "../../components/widgets/HoCard";
import noop from'lodash.noop'

const mapStateToProps = (state) => {
  const isLoading = state.loading.global;
  const account = state.account;
  const schoolId = state.account.school_id;
  const association = state.association.myEntity;
  const noticesList = state.notices.assoNoticesList;

  return {
    isLoading,
    schoolId,
    association,
    account,
    noticesList,
  };
};


@connect(mapStateToProps)
class NoticesListView extends Taro.PureComponent {
  componentWillMount() {

  }
  config = {
    enablePullDownRefresh: true,
  }
  onPullDownRefresh() {
    this.props.dispatch({
      type: 'notices/getNoticesList',
      payload: {
        schoolId: this.props.schoolId,
        associationId: this.props.association.id,
      }
    }).then(() => {
      Taro.stopPullDownRefresh()
    })
  }

  componentDidShow() {
    Taro.showLoading()
    this.props.dispatch({
      type: 'notices/getNoticesList',
      payload: {
        schoolId: this.props.schoolId,
        associationId: this.props.association.id,
      }
    }).then(() => {
      this.setState({
        isFetched: true,
      }, () => {
        Taro.hideLoading()

      })
    })
  }
  state = {
    isFetched: false,
    modalOpened: false,
    id: '',
  }

  renderNote= (item) => {
    const date = moment.unix(get(item,'update_time', '')).format('YYYY年MM月DD日 HH:mm')
    return date;
  }
  showModal = (item) => {
    console.log(item)
    this.setState({
      modalOpened: true,
      id: item.id
    })
  }
  handleModalClose = () => {
    this.setState({
      modalOpened: false,
    })
  }
  handleModalConfirm = (item) => {
    this.setState({
      modalOpened: false,
    });
    Taro.showLoading('删除中')
    this.handleDelClick(item);
  }
  handleModalCancel = () => {
    this.setState({
      modalOpened: false,
    })
  }
  handleDelClick = () => {
    this.props.dispatch({
      type: 'notices/delNotice',
      payload: {
        schoolId: this.props.schoolId,
        associationId: this.props.association.id,
        noticeId: this.state.id,
      }
    }).then(() => {
      this.props.dispatch({
        type: 'notices/getNoticesList',
        payload: {
          schoolId: this.props.schoolId,
          associationId: this.props.association.id,
        }
      }).then(() => {
        Taro.hideLoading()
      })
    })
  };
  renderNoticesList = () => {
    const noticesList = this.props.noticesList;
    noticesList.sort((a, b) => {
      return b.update_time - a.update_time;
    })
    return noticesList;
  }
  handleCreateClick =() => {
    Taro.navigateTo({
      url: '/pages/notices/create_notice_view'
    })
  }
  handleCardClick = (item) => {
    console.log(item)
    const url = '/pages/notices/notice_view?noticeId=' + item.id;
    Taro.navigateTo({
      url: url,
    })
  };
  render() {
    const noticesList = this.renderNoticesList()
    return (
      <View className='notices-list-view'>
        {this.props.association.role === 2 && this.state.isFetched && <View className='notices-button'>
          <AtButton onClick={this.handleCreateClick}>新增通知</AtButton>
        </View>}
        {noticesList.length === 0 && this.state.isFetched &&  <View style={{ margin: '1em auto'}}>
          暂无通知信息
        </View>}
        {noticesList.length !==0 && this.state.isFetched && <View className='notices-list'>
          {noticesList.map((item, index) => {
            return  <View key={index} className='card' >
              <HoCard
                manage={this.props.association.role === 2}
                type='notices'
                note={this.renderNote(item)}
                title={item.title}
                extra={item}
                onDelClick={this.showModal}
                author={item.author.nickname}
                content={item.content}
              />
            </View>
          })}
        </View>}
        <View className='notices-bottom'>
        </View>
        <AtModal
          isOpened={this.state.modalOpened}
          title='删除通知'
          cancelText='取消'
          confirmText='确认'
          onClose={this.handleModalClose}
          onCancel={this.handleModalCancel}
          onConfirm={this.handleModalConfirm}
          content='您确认要删除此通知吗？'
        />
      </View>
    )
  }
}

export default NoticesListView;
