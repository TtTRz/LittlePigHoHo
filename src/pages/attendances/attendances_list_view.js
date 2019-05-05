import Taro from '@tarojs/taro'
import { View, Button, Text, Picker} from "@tarojs/components";
import { connect } from '@tarojs/redux';
import {AtActivityIndicator, AtButton, AtFAtCheckbox, AtProgress, AtIcon, AtTextarea, AtInput, AtCard} from 'taro-ui'
import './attendances_list_view.scss'
import get from "lodash.get";
import moment from 'moment'
import HoCard from "../../components/widgets/HoCard";

const mapStateToProps = (state) => {
  const isLoading = state.loading.global;
  const account = state.account;
  const schoolId = state.account.school_id;
  const association = state.association.myEntity;
  const attendancesList = state.attendances.list;

  return {
    schoolId,
    account,
    isLoading,
    association,
    attendancesList,
  }
};

@connect(mapStateToProps)
class AttendancesListView extends Taro.PureComponent {

  state = {

  };

  componentWillMount() {
  }
  componentDidShow() {
    Taro.showLoading("加载中")
    this.props.dispatch({
      type: 'attendances/getAttendancesList',
      payload: {
        schoolId: this.props.schoolId,
        associationId: this.props.association.id,
      }
    }).then(() => {
      Taro.hideLoading()
    })
  }
  renderAttendancesList = () => {
    const attendancesList = this.props.attendancesList;
    const now = attendancesList.filter((item) => item.status === 1);
    const will = attendancesList.filter((item) => item.status === -1);
    const end = attendancesList.filter((item) => item.status === 0);
    end.sort((a,b) => {
      return b.end_time - a. end_time;
    });
    return [
      ...now,
      ...will,
      ...end,
    ];
  }
  handleCreateClick =() => {
    Taro.navigateTo({
      url: '/pages/attendances/create_attendances_view'
    })
  }
  handleCardClick = (item) => {
    const url = '/pages/attendances/attendances_view?aid=' + item.id;
    console.log(url)
    Taro.navigateTo({
      url: url,
    })
  }
  renderTime= (item) => {
    const start = moment.unix(get(item,'start_time', '')).format('MM月DD日 HH:mm')
    const end = moment.unix(get(item,'end_time', '')).format('MM月DD日 HH:mm')
    return start + " ~ " + end;
  }
  render() {
    const attendancesList = this.renderAttendancesList();
    return (
      <View className='attendances-list-view'>
        <View className='attendances-button'>
          <AtButton onClick={this.handleCreateClick}>新增考勤</AtButton>
        </View>
        {attendancesList.length === 0 && <View style={{ margin: '1em auto'}}>
          暂无考勤信息
        </View>}
        {attendancesList.length !==0 && <View className='attendances-list'>
          {attendancesList.map((item, index) => {
           return  <View key={index} className='card' onClick={this.handleCardClick.bind(this, item)}>
             <HoCard

               type='attendances'
               note={this.renderTime(item)}
               title={item.title}
               extra={item}
               content={item.description}
             />
           </View>
          })}
        </View>}
        <View className='attendances-bottom'>
        </View>

      </View>
    )
  }
}

export default AttendancesListView;
