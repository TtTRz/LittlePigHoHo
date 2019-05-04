import Taro from '@tarojs/taro'
import {View, Button, Text, Picker, Map} from "@tarojs/components";
import { connect } from '@tarojs/redux';
import {AtActivityIndicator, AtButton, AtCheckbox, AtProgress, AtIcon, AtTextarea, AtInput} from 'taro-ui'
import './attendances_view.scss'

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
    attendances: {},
    personLocation: {
      place_x: 0,
      place_y: 0,
    },
    isMounted: false,
  }

  componentDidMount() {
    const attendances = this.props.attendancesList.filter((item) => item.id === this.props.$router.aid);
    Taro.getLocation({
      type: 'gcj02',
      success: (res) => {
        const { latitude } = res;
        const { longitude } = res;
        this.setState({
          attendances: attendances,
          personLocation: {
            place_x: latitude,
            place_y: longitude,
          },
          isMounted: true,
        })
      }
    })
  }

  render() {
    return (
      <View className='attendances-view'>
        <View className='map'>
          {this.state.isMounted && <Map
            longitude={this.state.attendances.place_y}
            latitude={this.state.attendances.place_x}
            enable-scoll={false}
            markers={[{id: 1, latitude: this.state.personLocation.place_x, longitude: this.state.personLocation.place_y}]}
            circles={[{ latitude: this.state.attendances.place_x, longitude: this.state.attendances.place_y, radius: this.state.attendances.distance, color: '#1890ff'}]}
            scale={16}
          />}
        </View>
        <View>

        </View>
        <View>

        </View>
      </View>
    )
  }
}

export default AttendancesView;
