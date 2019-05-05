import Taro from '@tarojs/taro'
import {View, Button, Text, Picker, Map} from "@tarojs/components";
import { connect } from '@tarojs/redux';
import {AtActivityIndicator, AtButton, AtCheckbox, AtProgress,AtToast,AtCountdown, AtIcon, AtTextarea, AtInput} from 'taro-ui'
import './attendances_view.scss'
import moment from 'moment'
import {timeFromNow} from "../../utils/time_formatter";
const mapStateToProps = (state) => {

  return {
    account: state.account,
    association: state.association.myEntity,
    attendancesList: state.attendances.list,
    isLoading: state.loading.global,
  }
};

@connect(mapStateToProps)
class AttendancesView extends Taro.PureComponent {

  state = {
    isOpened: false,
    attendances: {},
    personLocation: {
      place_x: 0,
      place_y: 0,
    },
    isMounted: false,
  }

  componentDidMount() {
    const attendances = this.props.attendancesList.filter((item) => item.id === parseInt(this.$router.params.aid));
    Taro.getLocation({
      type: 'gcj02',
      success: (res) => {
        const { latitude } = res;
        const { longitude } = res;
        this.setState({
          attendances: attendances[0],
          personLocation: {
            place_x: latitude,
            place_y: longitude,
          },
          isMounted: true,
        })
      }
    })
  }
  handleSignClick = () => {
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
      this.setState({

      })
    })
  };
  renderTimeCount = () => {
    return timeFromNow(this.state.attendances.end_time);
  };

  render() {
    {console.log(this.state)}
    const timeCount = this.renderTimeCount();
    console.log(timeCount)
    return (
      <View className='attendances-view'>
        <View className='map'>
          {this.state.isMounted && <Map
            style={{ width: '100%', height: '12em'}}
            longitude={this.state.attendances.place_y}
            latitude={this.state.attendances.place_x}
            enable-scoll={false}
            markers={[{id: 1, latitude: this.state.personLocation.place_x, longitude: this.state.personLocation.place_y}]}
            circles={[{ latitude: this.state.attendances.place_x, longitude: this.state.attendances.place_y, radius: this.state.attendances.distance, color: '#1890ff'}]}
            scale={18}
          />}
        </View>
        <View className='info'>
          <View className='title'>
            {this.state.attendances.title}
          </View>
          <View className='description'>
            {this.state.attendances.description}
          </View>
          <View className='time-countdown'>

            <AtCountdown
              isShowDay={timeCount.day !== 0}
              day={timeCount.day}
              hours={timeCount.hour}
              minutes={timeCount.minute}
              seconds={timeCount.second}
            />
          </View>
        </View>
        <View className='action'>
          <AtButton onClick={this.handleSignClick}>
            签到
          </AtButton>
        </View>

      </View>
    )
  }
}

export default AttendancesView;
