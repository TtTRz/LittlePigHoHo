import Taro from '@tarojs/taro'
import {View, Button, Text, Picker, Map, CoverView} from "@tarojs/components";
import { connect } from '@tarojs/redux';
import {AtActivityIndicator, AtButton,AtModal, AtTabs, AtTabsPane, AtList,AtListItem, AtCheckbox,AtMessage, AtProgress,AtToast, AtCountdown, AtIcon, AtTextarea, AtInput} from 'taro-ui'
import './attendances_view.scss'

import moment from 'moment'
import {timeFromNow} from "../../utils/time_formatter";
import HoList from "../../components/widgets/HoList";
import AttendancesEditor from "../../components/attendances/attendances_editor";
const mapStateToProps = (state) => {

  return {
    account: state.account,
    association: state.association.myEntity,
    attendancesList: state.attendances.list,
    isLoading: state.loading.global,
    signMembersList: state.attendances.signMembersList,
    manage: state.association.myEntity.role === 2,
    attendance: state.attendances.entity,
    // manage: false,
  }
};

@connect(mapStateToProps)
class AttendancesView extends Taro.PureComponent {
  config = {
    enablePullDownRefresh: true,
  }
  state = {
    isOpened: false,
    attendances: {},
    personLocation: {
      place_x: 0,
      place_y: 0,
    },
    isMounted: false,
    leaveDesc: '',
    leaveVisible: false,
    modalOpened: false,
    current: 0,
  }
  TAB_LIST = [{
    title: '签到表'
  }, {
    title: '请假管理 '
  }, {
    title: '设置',
  }]
  onPullDownRefresh() {
    this.props.dispatch({
      type: 'association/getAssociationEntity',
      payload: {
        schoolId: this.props.account.school_id,
        associationId: this.props.association.id,
      }
    }).then(() => {
      this.props.dispatch({
        type: 'attendances/getAttendancesEntity',
        payload: {
          schoolId: this.props.account.school_id,
          associationId: this.props.association.id,
          attendancesId: this.$router.params.aid,
        }
      }).then(() => {
        Taro.getLocation({
          type: 'gcj02',
          success: (res) => {
            const { latitude } = res;
            const { longitude } = res;
            this.setState({
              attendances: this.props.attendance,
              personLocation: {
                place_x: latitude,
                place_y: longitude,
              },
              isMounted: true,
            })
          }
        });
        this.props.dispatch({
          type: 'attendances/getSignMembersList',
          payload: {
            schoolId: this.props.account.school_id,
            associationId: this.props.association.id,
            attendancesId: this.$router.params.aid,
            type: 0,
          }
        }).then(() => {
          Taro.stopPullDownRefresh()
        })
      })
    })
  }

  componentDidShow() {
    this.props.dispatch({
      type: 'association/getAssociationEntity',
      payload: {
        schoolId: this.props.account.school_id,
        associationId: this.props.association.id,
      }
    }).then(() => {
      this.props.dispatch({
        type: 'attendances/getAttendancesEntity',
        payload: {
          schoolId: this.props.account.school_id,
          associationId: this.props.association.id,
          attendancesId: this.$router.params.aid,
        }
      }).then(() => {
        Taro.getLocation({
          type: 'gcj02',
          success: (res) => {
            const { latitude } = res;
            const { longitude } = res;
            this.props.dispatch({
              type: 'attendances/getSignMembersList',
              payload: {
                schoolId: this.props.account.school_id,
                associationId: this.props.association.id,
                attendancesId: this.$router.params.aid,
                type: 0,
              }
            }).then(() => {
              this.setState({
                attendances: this.props.attendance,
                personLocation: {
                  place_x: latitude,
                  place_y: longitude,
                },
                isMounted: true,
              })
            })
          }
        });
      })
    })
  }

  handleLeaveClick = () => {
    this.setState({
      leaveVisible: true,
    })
  }
  handleLeaveSubmit = () => {
    this.props.dispatch({
      type: 'attendances/leaveAttendances',
      payload: {
        description: this.state.leaveDesc,
        schoolId: this.props.account.school_id,
        associationId: this.props.association.id,
        attendancesId: this.$router.params.aid,
      }
    }).then(() => {
      Taro.showToast({
        title: '审批中',
        icon: 'loading'
      })
      this.setState({
        leaveVisible: false,
      })
    })
  }
  handleSignClick = () => {
    Taro.getLocation({
      type: 'gcj02',
      success: (res) => {
        const { latitude } = res;
        const { longitude } = res;
        this.setState({
          personLocation: {
            place_x: latitude,
            place_y: longitude,
          },
        },() => {
          this.props.dispatch({
            type: 'attendances/getMapDistance',
            payload: {
              placeA: {
                place_x: this.state.personLocation.place_x,
                place_y: this.state.personLocation.place_y,
              },
              placeB: {
                place_x: this.state.attendances.place_x,
                place_y: this.state.attendances.place_y,
              }
            }
          }).then((re) => {
            if(re.distance >= this.state.attendances.distance && this.state.attendances.distance !== 0) {
              Taro.showToast({
                title: '签到失败 超出有效距离',
                icon: 'none'
              })
            } else {
              this.props.dispatch({
                type: 'attendances/signAttendances',
                payload: {
                  place_x: this.state.personLocation.place_x,
                  place_y: this.state.personLocation.place_y,
                  schoolId: this.props.account.school_id,
                  associationId: this.props.association.id,
                  attendancesId: this.$router.params.aid,
                }
              }).then(() => {
                Taro.showToast({
                  title: '签到成功'
                })
                this.setState({
                  attendances: {
                    ...this.state.attendances,
                    attendance_status: 1,
                  }
                })
              })
            }
          })
        })
      }
    });

  };
  handleInputChange = (keyName, value) => {
    this.setState({
      [keyName]: value.target.value,
    })
  };
  renderTimeCount = () => {
    return timeFromNow(this.state.attendances.end_time);
  };
  handleEditClick = (item) => {
    const start = item.startDateSel+" "+item.startTimeSel+":00";
    const end = item.endDateSel+" "+item.endTimeSel+":00";
    const startMoment = moment(start, 'YYYY-MM-DD HH:mm:ss');
    const endMoment = moment(end, 'YYYY-MM-DD HH:mm:ss');
    this.props.dispatch({
      type: 'attendances/editAttendances',
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
        type: 'attendances/getAttendancesEntity',
        payload: {
          schoolId: this.props.account.school_id,
          associationId: this.props.association.id,
          attendancesId: this.$router.params.aid,
        }
      }).then(() => {
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
  handleTabChange = (value) => {
    this.setState({
      current: value,
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
  renderStatus = () => {
    const { status, attendance_status } = this.state.attendances;
    if(parseInt(attendance_status, 10) === 1 && !this.props.manage) {
      return {
        id: 1,
        title: '已签到',
      }
    }
    if(parseInt(attendance_status, 10) === 0 && !this.props.manage) {
      return {
        id: 2,
        title: '已请假'
      }
    }
    if(parseInt(status, 10) === -1) {
      return {
        id: -1,
        title: '未开始'
      }
    }
    if(parseInt(status, 10) === 1) {
      return {
        id: 3,
        title: '进行中',
      }
    }
    if(parseInt(status, 10) === 0 && this.props.manage) {
      return {
        id: 0,
        title: '已结束'
      }
    }
    if(parseInt(status, 10) === 0 && parseInt(attendance_status, 10) === -1 && !this.props.manage){
      return {
        id: 0,
        title: '缺勤',
      }
    }
  }
  render() {
    const timeCount = this.renderTimeCount();
    const status = this.renderStatus()
    return (
      <View className='attendances-view'>
        {this.state.isMounted && <View className='map'>
          {this.state.isMounted && <Map
            style={{ width: '100%', height: '12em'}}
            longitude={this.state.attendances.place_y}
            latitude={this.state.attendances.place_x}
            enable-scoll={false}
            markers={[{id: 1, latitude: this.state.personLocation.place_x, longitude: this.state.personLocation.place_y}]}
            circles={[{ latitude: this.state.attendances.place_x, longitude: this.state.attendances.place_y, radius: this.state.attendances.distance, color: '#1890ff'}]}
            scale={20}
          />}
        </View>}
        {this.state.isMounted && <View className='info'>
          <View className='title'>
            {this.state.attendances.title}
          </View>
          <View className='tag-bar'>
            <View className={'tag ' + `tag_${status.id}`}>
              {status.title}
            </View>
          </View>
          <View className='description'>
            {this.state.attendances.description}
          </View>
          {(this.state.attendances.status === 1 && this.state.attendances.attendance_status === -1  ) && <View className='time-countdown'>
            <AtCountdown
              isShowDay={timeCount.day !== 0}
              day={timeCount.day}
              hours={timeCount.hour}
              minutes={timeCount.minute}
              seconds={timeCount.second}
            />
          </View>}
        </View>}
        {!this.props.manage && this.state.isMounted && <View>
          <View className='action'>
            {(this.state.attendances.status === 1 && this.state.attendances.attendance_status === -1  )&& <View className='button'>
              <AtButton type='secondary' onClick={this.handleSignClick}>
                签到
              </AtButton>
            </View>}
            {(this.state.attendances.status === 1 && this.state.attendances.attendance_status === -1 && !this.state.leaveVisible )&& <View className='button'>
              <AtButton onClick={this.handleLeaveClick}>
                请假
              </AtButton>
            </View>}
          </View>
          {this.state.leaveVisible && <View className='leave'>
            <AtTextarea
              value={this.state.leaveDesc}
              onChange={this.handleInputChange.bind(this, 'leaveDesc')}
              placeholder='请输入请假原因'
              height={200}
            />
            <View className='button'>
              <AtButton disabled={this.state.leaveDesc === ''} onClick={this.handleLeaveSubmit}>提交请假申请</AtButton>
            </View>
          </View>}
          {this.state.attendances.attendance_status === 0 && <View>
            请假原因:
          </View>}
        </View>}
        {this.props.manage && this.state.isMounted && <AtTabs current={this.state.current} tabList={this.TAB_LIST} onClick={this.handleTabChange.bind(this)}>
            <AtTabsPane current={this.state.current} index={0} >
              <View className='members-list'>
                <HoList data={this.props.signMembersList} type='attendances' isEnded={this.state.attendances.status === 0} />
              </View>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={1}>

            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={2}>
              {this.state.current === 2 && <AttendancesEditor
                attendances={this.state.attendances}
                onDelClick={this.showModal}
                onSubmitClick={this.handleEditClick}
                isLoading={this.props.isLoading}
              />}
            </AtTabsPane>
          </AtTabs>}

        <AtModal
          isOpened={this.state.modalOpened}
          title='删除考勤'
          cancelText='取消'
          confirmText='确认'
          onClose={this.handleModalClose}
          onCancel={this.handleModalCancel}
          onConfirm={this.handleModalConfirm}
          content='您确认要删除此考勤表吗？'
        />
      </View>
    )
  }
}

export default AttendancesView;
