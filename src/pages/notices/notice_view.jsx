import Taro from '@tarojs/taro'
import {View, Button, Text, Picker, Map, CoverView} from "@tarojs/components";
import { connect } from '@tarojs/redux';
import {AtActivityIndicator, AtButton,AtModal, AtTabs, AtTabsPane, AtList,AtListItem, AtCheckbox,AtMessage, AtProgress,AtToast, AtCountdown, AtIcon, AtTextarea, AtInput} from 'taro-ui'
import './notice_view.scss'
import get from 'lodash.get';
import moment from 'moment'
import {timeFromNow} from "../../utils/time_formatter";
import NoticeEditor from "../../components/notices/notice_editor";

const mapStateToProps = (state) => {

  return {
    account: state.account,
    association: state.association.myEntity,
    attendancesList: state.attendances.list,
    isLoading: state.loading.global,
    manage: state.association.myEntity.role === 2,
    notice: state.notices.entity,
  }
};

@connect(mapStateToProps)
class AttendancesView extends Taro.PureComponent {
  config = {
    enablePullDownRefresh: true,
  }
  state = {
    isOpened: false,
    attendances: this.props.attendance,
    personLocation: this.props.personLocations,
    leaveDesc: '',
    isMounted: false,
    leaveVisible: false,
    modalOpened: false,
    current: 0,
  }
  onPullDownRefresh() {

  }

  componentDidShow() {
    Taro.showLoading();
    this.props.dispatch({
      type: 'notices/getNoticeEntity',
      payload: {
        schoolId: this.props.account.school_id,
        associationId: this.props.association.id,
        noticeId: this.$router.params.noticeId,
      }
    }).then(() => {
      console.log('success')
      this.setState({
        notice: this.props.notice,
      }, () => {
        Taro.hideLoading();
      })
    });
  }

  handleInputChange = (keyName, value) => {
    this.setState({
      [keyName]: value.target.value,
    })
  };

  handleEditClick = (item) => {
    const start = item.startDateSel+" "+item.startTimeSel+":00";
    const end = item.endDateSel+" "+item.endTimeSel+":00";
    const startMoment = moment(start, 'YYYY-MM-DD HH:mm:ss');
    const endMoment = moment(end, 'YYYY-MM-DD HH:mm:ss');
    this.props.dispatch({
      type: 'notices/editAttendances',
      payload: {
        ...item,
        start_time: startMoment.format('X'),
        end_time: endMoment.format('X'),
        schoolId: this.props.account.school_id,
        associationId: this.props.association.id,
        attendancesId: this.$router.params.aid,
      }
    }).then(() => {
      this.props.dispatch({
        type: 'notices/getNoticeEntity',
        payload: {
          schoolId: this.props.account.school_id,
          associationId: this.props.association.id,
          noticeId: this.$router.params.noticeId,
        }
      }).then(() => {
        Taro.showToast({
          title: '修改成功',
        })
        this.setState({
          attendances: this.props.attendance
        })
      })
    })
  }
  handleDelClick = () => {
    this.props.dispatch({
      type: 'attendances/delAttendances',
      payload: {
        schoolId: this.props.account.school_id,
        associationId: this.props.association.id,
        attendancesId: this.$router.params.aid,
      }
    }).then(() => {
      Taro.hideLoading();
      Taro.showToast({
        title: '删除成功'
      })
      setTimeout(() => {
        Taro.redirectTo({
          url: '/pages/attendances/attendances_list_view'
        })
      }, 1000)
    })
  }

  showModal = () => {
    this.setState({
      modalOpened: true,
    })
  }
  handleModalClose = () => {
    this.setState({
      modalOpened: false,
    })
  }
  handleModalConfirm = () => {
    this.setState({
      modalOpened: false,
    });
    Taro.showLoading('删除中')
    this.handleDelClick();
  }
  handleModalCancel = () => {
    this.setState({
      modalOpened: false,
    })
  }
  render() {
    return (
      <View className='notice-view'>
        <NoticeEditor
          notice={this.state.notice}
          isLoading={this.props.isLoading}
          onDelClick={this.showModal}
          onSubmitClick={this.handleEditClick}
        />
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

export default AttendancesView;
